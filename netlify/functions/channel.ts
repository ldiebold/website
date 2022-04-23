import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { updateOrCreateChannel, useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, sendRes } from '../services/utils'
import type { definitions } from '~/types/supabase'

interface ChannelSet {
  appid: string
  channel: string
  version?: string
  public?: boolean
}
interface GetDevice {
  appid: string
  channel?: string
}

export const get = async(event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = event.queryStringParameters as any as GetDevice
  if (!body.appid || await checkAppOwner(apikey.user_id, body.appid, supabase))
    return sendRes({ status: 'You can\'t access this app' }, 400)
  // get one channel or all channels
  if (body.channel) {
    const { data: dataChannel, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', body.appid)
      .eq('name', body.channel)
    if (dbError || !dataChannel || !dataChannel.length)
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    return sendRes(dataChannel[0])
  }
  else {
    const { data: dataChannels, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', body.appid)
    if (dbError || !dataChannels || !dataChannels.length)
      return sendRes([])
    return sendRes(dataChannels)
  }
}

export const post = async(event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = JSON.parse(event.body || '{}') as ChannelSet

  if (await checkAppOwner(apikey.user_id, body.appid, supabase))
    return sendRes({ status: 'You can\'t edit this app' }, 400)
  const channel: Partial<definitions['channels']> = {
    created_by: apikey.user_id,
    app_id: body.appid,
    name: body.channel,
  }
  if (body.version) {
    const { data, error: vError } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .select()
      .eq('app_id', body.appid)
      .eq('name', body.version)
      .eq('user_id', apikey.user_id)
      .eq('deleted', false)
    if (vError || !data || !data.length)
      return sendRes({ status: `Cannot find version ${body.version}`, error: JSON.stringify(vError) }, 400)
    channel.version = data[0].id
  }
  if (body.public !== undefined)
    channel.public = body.public

  try {
    const { error: dbError } = await updateOrCreateChannel(channel)
    if (dbError)
      return sendRes({ status: 'Cannot set channels', error: JSON.stringify(dbError) }, 400)
  }
  catch (e) {
    return sendRes({ status: 'Cannot set channels', error: e }, 500)
  }
  return sendRes()
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase()
  if (event.httpMethod === 'POST')
    return post(event, supabase)
  else if (event.httpMethod === 'GET')
    return get(event, supabase)
  return sendRes({ status: 'Method now allowed' }, 400)
}
