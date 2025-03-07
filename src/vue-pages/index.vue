<script setup lang="ts">
import CIExpert from '@/components/CIExpert.vue'
import Orgs from '@/components/Orgs.vue'
import Testimonials from '@/components/Testimonials.vue'
import { useRuntimeConfig } from '@/config/app'
import { chatLoader } from '@/services/bento'
import { type Locales } from '@/services/locale'
import { shortNumber } from '@/services/misc'
import { posthogLoader } from '@/services/posthog'
import translations from '@/services/translations'
import { getRelativeLocaleUrl } from 'astro:i18n'
import dayjs from 'dayjs'
import { onMounted, reactive, ref } from 'vue'

const config = useRuntimeConfig()
const brand = config.public.brand || ''
const props = defineProps<{ locale: Locales }>()

const chatLoaded = ref(false)
const handleScroll = () => {
  if (!chatLoaded.value) {
    chatLoaded.value = true
    chatLoader()
    window.removeEventListener('scroll', handleScroll)
  }
}

onMounted(() => {
  posthogLoader()
  window.addEventListener('scroll', handleScroll)
})

const stats = reactive({
  stars: shortNumber(499),
  apps: shortNumber(1400),
  updates: shortNumber(947593631),
})

fetch(`${config.public.baseApiUrl}/private/website_stats`).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      stats.apps = shortNumber(data.apps ?? shortNumber(1400))
      stats.updates = shortNumber(data.updates ?? shortNumber(947593631))
      stats.stars = shortNumber(data.stars ?? shortNumber(499))
    })
  }
})
</script>

<template>
  <div>
    <section class="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <p class="font-pj inline-flex rounded-full border border-gray-200 px-4 py-2 text-base">{{ translations['open_source'][props.locale] }}</p>
          <h1 class="font-pj mt-5 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight lg:leading-tight xl:text-5xl">
            {{ translations['instant_updates_for_capacitor'][props.locale] }}
          </h1>
          <h2 class="font-inter mx-auto mt-6 max-w-md text-base leading-7 text-gray-400">
            {{ translations['ship_updates_fixes_changes_and_features'][props.locale] }}
            <br /><span class="font-bold">{{ translations['within_minutes'][props.locale] }}</span
            ><br />
          </h2>
          <div class="group relative mt-10 inline-flex">
            <div
              class="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"
            />
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              title="Get quote now"
              target="_blank"
              class="font-pj relative inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              role="button"
            >
              {{ translations['try_for_free'][props.locale] }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-gray-900 py-12 sm:py-16 lg:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto grid grid-cols-1 gap-x-12 gap-y-8 px-16 text-center sm:grid-cols-3 sm:px-0 lg:max-w-4xl lg:gap-x-24">
          <div>
            <svg class="mx-auto h-14 w-auto text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                d="M228.7 299.3C222.4 293.1 222.4 282.9 228.7 276.7C234.9 270.4 245.1 270.4 251.3 276.7L304 329.4V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V329.4L388.7 276.7C394.9 270.4 405.1 270.4 411.3 276.7C417.6 282.9 417.6 293.1 411.3 299.3L331.3 379.3C325.1 385.6 314.9 385.6 308.7 379.3L228.7 299.3zM272 32C331.5 32 384.1 61.55 416 106.8C430.5 99.87 446.8 96 464 96C525.9 96 576 146.1 576 208C576 218.7 574.5 228.1 571.7 238.8C612.3 260.2 640 302.9 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.15 219.9 96.17 200.1C100.3 106.6 177.4 32 272 32zM272 64C194.6 64 131.5 125 128.1 201.5C127.6 214.6 119.1 225.1 106.8 230.3C63.18 245.7 32 287.2 32 336C32 397.9 82.14 448 144 448H512C565 448 608 405 608 352C608 315.2 587.3 283.2 556.8 267.1C543.4 259.1 536.8 244.5 540.9 229.1C542.9 223 544 215.7 544 208C544 163.8 508.2 128 464 128C451.7 128 440.1 130.8 429.7 135.7C415.7 142.4 398.8 137.9 389.8 125.2C363.7 88.12 320.7 64 272 64V64z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">{{ translations['instant_updates'][props.locale] }}</h3>
            <p class="mt-3 text-sm text-gray-400">
              {{ translations['reach_users_now_not_weeks_later'][props.locale] }}
            </p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-14 w-auto text-white" fill="currentColor" viewBox="0 0 448 512">
              <path
                d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">{{ translations['app_store_compliant'][props.locale] }}</h3>
            <p class="mt-3 text-sm text-gray-400">{{ translations['100_compliant_with_apple_and_android_requirements'][props.locale] }}</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-14 w-auto text-white" fill="currentColor" viewBox="0 0 576 512">
              <path
                d="M304 480H64c-17.67 0-32-14.33-32-32V64c0-17.67 14.33-32 32-32h128v112C192 170.5 213.5 192 240 192h122.5C374.4 192 384 182.4 384 170.5c0-16.97-6.742-33.25-18.74-45.25L258.7 18.75C246.7 6.742 230.5 0 213.5 0H64C28.65 0 .0007 28.65 .0007 64l.0059 384c0 35.35 28.65 64 64 64H304c8.836 0 16-7.164 16-16C320 487.2 312.8 480 304 480zM224 34.08c4.477 1.566 8.664 3.846 12.12 7.299l106.5 106.5C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08zM528 320L528 256c0-35.28-28.72-64-64-64s-64 28.72-64 64v64c-26.51 0-48 21.49-48 48v96c0 26.51 21.49 48 48 48h128c26.51 0 48-21.49 48-48v-96C576 341.5 554.5 320 528 320zM432 256c0-17.66 14.34-32 32-32s32 14.34 32 32v64h-64V256zM544 464c0 8.822-7.178 16-16 16h-128c-8.822 0-16-7.178-16-16v-96c0-8.822 7.178-16 16-16h128c8.822 0 16 7.178 16 16V464z"
              />
            </svg>
            <h3 class="mt-6 text-lg font-medium text-white md:mt-8">{{ translations['end_to_end_encryption'][props.locale] }}</h3>
            <p class="mt-3 text-sm text-gray-400">{{ translations['only_your_users_can_decrypt_your_updates_no_one_else'][props.locale] }}</p>
          </div>
        </div>
        <h3 class="font-inter mx-auto mt-12 hidden max-w-xl text-xl leading-7 text-gray-400 md:block">
          <span class="font-bold">&#128075; {{ translations['no_more_wait'][props.locale] }}</span>
          {{ translations['for_apple_and_google_app_updates_distribution'][props.locale] }}
        </h3>
        <h3 class="font-inter mx-auto mt-12 block max-w-sm text-center text-xl leading-7 text-gray-400 md:hidden">
          <span class="font-bold">&#128075; {{ translations['no_more_wait'][props.locale] }}</span>
        </h3>
        <h3 class="font-inter mx-auto block max-w-sm text-center text-xl leading-7 text-gray-400 md:hidden">
          {{ translations['for_apple_and_google_app_updates_distribution'][props.locale] }}
        </h3>
      </div>
    </section>
    <section class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20 xl:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center xl:grid-cols-2">
          <div class="px-8 text-center md:mx-auto md:max-w-2xl xl:max-w-none xl:pr-16 xl:text-left">
            <h2 class="font-pj text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">{{ translations['youre_in_good_company'][props.locale] }}</h2>
            <p class="font-pj mt-6 text-lg font-normal text-gray-800">
              {{ translations['capgo_enables_development_teams_at_some_of_the_most_innovative_companies'][props.locale] }}
            </p>
          </div>
          <div class="relative mt-8 sm:mt-12 lg:mx-auto lg:max-w-4xl xl:mt-0 xl:max-w-none">
            <div class="absolute inset-16">
              <div
                class="mx-auto h-full w-full rotate-180 rounded-3xl opacity-30 blur-lg filter"
                style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
              />
            </div>
            <div class="relative space-y-5">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/kick_logo.webp" alt="Kick" title="Kick" />
                </div>
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/pizza_hut_logo.webp" alt="Pizza hut" title="Pizza hut" />
                </div>
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/remnote_logo.svg" alt="remnote" title="remnote" />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-6">
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/revel_logo.svg" alt="hello revel" title="hello revel" />
                </div>
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/xbe_logo.webp" alt="x-b-e" title="x-b-e" />
                </div>
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/suez_logo.webp" alt="suez moneau" title="suez moneau" />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 xl:translate-x-12">
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/irec_logo.webp" alt="irec" title="irec" />
                </div>
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/vella_logo.svg" alt="vella" title="vella" />
                </div>
                <div class="mx-auto flex w-44 items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 py-4 shadow-lg md:w-full">
                  <img loading="lazy" height="64" width="189" class="h-8 w-auto" src="/ourliving_logo.webp" alt="ourliving" title="ourliving" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-500 xl:bg-gradient-to-r" />
    </section>
    <section class="relative bg-gray-800 py-20 md:my-20">
      <svg class="absolute hidden opacity-30 md:-left-1/3 md:-top-5 md:m-0 md:block lg:-left-16" width="404" height="392" fill="none" viewBox="0 0 404 392">
        <defs>
          <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
      </svg>
      <svg class="absolute hidden opacity-30 md:-bottom-5 md:-right-1/3 md:m-0 md:block lg:-right-16" width="404" height="392" fill="none" viewBox="0 0 404 392">
        <defs>
          <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
      </svg>
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
            {{ translations['apps_with_20m_users'][props.locale] }}
          </h2>
          <h2 class="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
            {{ translations['use_capgo'][props.locale] }}
          </h2>
          <p class="mt-3 text-base leading-relaxed text-gray-300 md:mt-8">
            {{ translations['our_numbers_are_shared_transparently_since_december_2021'][props.locale] }}
          </p>
          <p class="mt-5 text-center text-base text-gray-400">{{ translations['last_update'][props.locale] }}: {{ dayjs().format('MMMM DD, YYYY') }}</p>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-8 text-center sm:gap-x-8 md:grid-cols-3 lg:mt-24">
          <div>
            <h3 class="text-7xl font-bold">
              <span class="bg-gradient-to-r from-[#FF44EC] to-[#44BCFF] bg-clip-text text-transparent">{{ stats.updates }}⬆</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">{{ translations['updates_delivered'][props.locale] }}</p>
            <p class="mt-0.5 text-base text-gray-400">{{ translations['all_around_the_globe'][props.locale] }}</p>
          </div>
          <div>
            <h3 class="text-7xl font-bold">
              <span class="bg-gradient-to-r from-[#FF44EC] to-[#44BCFF] bg-clip-text text-transparent">{{ stats.apps }}❤️</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">{{ translations['apps'][props.locale] }}</p>
            <p class="mt-0.5 text-base text-gray-400">{{ translations['using_us_in_production'][props.locale] }}</p>
          </div>
          <div>
            <h3 class="text-7xl font-bold">
              <span class="bg-gradient-to-r from-[#FF44EC] to-[#44BCFF] bg-clip-text text-transparent">{{ stats.stars }}⭐️</span>
            </h3>
            <p class="mt-4 text-xl font-medium text-gray-300">{{ translations['stars_in_github'][props.locale] }}</p>
            <p class="mt-0.5 text-base text-gray-400">{{ translations['open_source'][props.locale] }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white py-10 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl xl:text-5xl">
            {{ translations['how_it_work'][props.locale] }}
          </h2>
          <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-600">{{ translations['ship_your_first_update_in_less_than_15_minutes'][props.locale] }}</p>
        </div>
        <div class="relative mt-12 lg:mt-20">
          <div class="absolute inset-x-0 top-2 hidden md:block md:px-20 lg:px-28 xl:px-44">
            <img
              loading="lazy"
              height="47"
              width="864"
              class="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt="curved dot line"
              title="curved dot line"
            />
          </div>
          <div class="relative grid grid-cols-1 gap-x-12 gap-y-12 text-center md:grid-cols-3">
            <div>
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                <span class="text-2xl font-bold text-gray-700"> 1 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {{ translations['install_the_plugin'][props.locale] }}
              </h3>
              <p class="mt-4 text-base text-gray-600">Run <span class="font-bold text-gray-900">npx @capgo/cli init</span> that it !</p>
            </div>
            <div>
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                <span class="text-2xl font-bold text-gray-700"> 2 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {{ translations['send_your_first_update'][props.locale] }}
              </h3>
              <p class="mt-4 text-base text-gray-600">
                {{ translations['build_your_app_as_usual_then_send_with_the_cli'][props.locale] }}
              </p>
            </div>
            <div>
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                <span class="text-2xl font-bold text-gray-700"> 3 </span>
              </div>
              <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                {{ translations['get_the_update'][props.locale] }}
              </h3>
              <p class="mt-4 text-base text-gray-600">
                {{ translations['open_the_app_it_update_in_the_background'][props.locale] }}
              </p>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-3xl text-center">
          <div class="group relative mt-10 inline-flex">
            <div
              class="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"
            />
            <a
              :href="getRelativeLocaleUrl(props.locale, 'register')"
              title="Get quote now"
              target="_blank"
              class="font-pj relative inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              role="button"
            >
              {{ translations['start_now'][props.locale] }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-2 py-10 md:grid-cols-2 md:gap-10 md:py-20">
        <div class="order-last md:order-none">
          <h2 class="my-10 text-4xl font-extrabold md:text-7xl">{{ translations['faster_releases'][props.locale] }}</h2>
          <p class="text-lg lg:w-2/3">
            {{ translations['launch_multiple_releases_per_week'][props.locale].replaceAll('$1', brand) }}
          </p>
        </div>
        <img
          width="310"
          height="248"
          loading="lazy"
          class="md:h-62 mx-auto h-full rounded-lg"
          src="/develop_illu.svg"
          title="productivity illustration"
          alt="productivity illustration"
        />
      </div>
      <div class="grid grid-cols-1 gap-2 py-10 md:grid-cols-2 md:gap-10 md:py-20">
        <img
          width="310"
          height="248"
          loading="lazy"
          class="md:h-62 mx-auto my-10 h-full rounded-lg"
          src="/build_illustration.svg"
          alt="build illustration"
          title="build illustration"
        />
        <div>
          <h2 class="my-10 text-4xl font-extrabold md:text-7xl">Integration</h2>
          <p class="text-lg lg:w-2/3">
            {{ translations['easily_combine_features_ci_cd'][props.locale].replace('$1', brand) }}<br /><br />
            {{ translations['its_compatible_with_azure_devops_gitlab_github_jenkins_cloudbees_travis_azure_devops_gitlab_github_circleci_and_many_more'][props.locale] }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-2 py-10 md:grid-cols-2 md:gap-10 md:py-20">
        <div class="order-last md:order-none">
          <h2 class="my-10 text-4xl font-extrabold md:text-7xl">{{ translations['instant_updates'][props.locale] }}</h2>
          <p class="text-lg lg:w-2/3">
            {{ translations['goodbye_bugs'][props.locale] }}
          </p>
        </div>
        <img
          width="310"
          height="248"
          loading="lazy"
          class="md:h-62 mx-auto h-full rounded-lg"
          src="/update_illustration.svg"
          alt="send update illustration"
          title="send update illustration"
        />
      </div>
    </section>
    <section class="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 class="font-pj text-center text-3xl font-bold text-gray-900 sm:text-7xl md:!leading-[85px] xl:text-7xl">
          {{ translations['manage_updates_effortlessly'][props.locale] }}
        </h3>
        <div class="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:items-center md:gap-x-16">
          <div>
            <img loading="lazy" height="332" width="576" class="h-auto w-auto" src="/stats_demo_3.webp" alt="Manage app illustration" title="Manage app illustration" />
          </div>
          <div class="md:pr-12">
            <div class="">
              <div class="py-8 md:py-11">
                <div class="space-y-12">
                  <div class="flex items-start">
                    <div class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div class="ml-5">
                      <h3 class="font-pj text-lg font-bold text-gray-900">
                        {{ translations['user_assignment'][props.locale] }}
                      </h3>
                      <p class="font-pj text-lg font-normal text-gray-600">
                        {{ translations['easily_assign_users_and_send_the_latest_update_to_your_private_or_public_testers'][props.locale] }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-2.21-6H13V9c0-.55-.45-1-1-1s-1 .45-1 1v4H9.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79a.5.5 0 0 0-.36-.85z"
                        />
                      </svg>
                    </div>
                    <div class="ml-5">
                      <h3 class="font-pj text-lg font-bold text-gray-900">
                        {{ translations['seamless_deployment_process'][props.locale] }}
                      </h3>
                      <p class="font-pj text-lg font-normal text-gray-600">{{ translations['when_your_update_is_ready_deploy_it_seamlessly_to_all_your_users'][props.locale] }}</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048">
                        <path
                          fill="currentColor"
                          d="M1152 512H896V256h128v128h128v128zm512 1032q42 11 77 35t60 57t40 73t15 83q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-43 14-83t39-73t61-57t78-35v-264h-512v264q42 11 77 35t60 57t40 73t15 83q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-43 14-83t39-73t61-57t78-35v-264H384v264q42 11 77 35t60 57t40 73t15 83q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-43 14-83t39-73t61-57t78-35v-392h640V891q-83-11-153-50t-122-99t-80-135t-29-159q0-93 35-174t96-143t142-96T960 0q93 0 174 35t143 96t96 142t35 175q0 83-29 158t-80 135t-121 99t-154 51v261h640v392zM640 448q0 66 25 124t68 102t102 69t125 25q66 0 124-25t101-68t69-102t26-125q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124zM448 1792q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50zm640 0q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50zm512 128q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50q0 27 10 50t27 40t41 28t50 10z"
                        />
                      </svg>
                    </div>
                    <div class="ml-5">
                      <h3 class="font-pj text-lg font-bold text-gray-900">{{ translations['simple_configuration_management'][props.locale] }}</h3>
                      <p class="font-pj text-lg font-normal text-gray-600">
                        {{ translations['manage_all_your_configurations_conveniently_through_our_user_friendly_web_interface'][props.locale] }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Testimonials :locale="props.locale" />
    <Orgs :locale="props.locale" />
    <CIExpert :locale="props.locale" />
    <div class="relative mt-14 sm:mt-24 sm:py-16">
      <div aria-hidden="true" class="hidden sm:block">
        <div class="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-800" />
        <svg class="absolute left-1/2 top-8 -ml-3" width="404" height="392" fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
        </svg>
      </div>
      <div class="mx-auto max-w-md px-4 pb-3 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative overflow-hidden rounded-2xl bg-gray-700 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
          <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
              <path class="text-gray-600 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
              <path class="text-gray-800 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
            </svg>
          </div>
          <div class="relative flex flex-col md:flex-row">
            <div class="sm:text-center md:w-1/2">
              <h3 class="text-3xl tracking-tight text-white sm:text-4xl xl:text-5xl" v-html="translations['push_updates_like_your_commits'][props.locale]" />
            </div>
            <div class="sm:text-center md:w-1/2">
              <p class="text-xl tracking-tight text-white">
                {{ translations['try_risk_free_with_a_15_days_free_trial'][props.locale] }}
              </p>
              <a
                :href="getRelativeLocaleUrl(props.locale, 'register')"
                target="_blank"
                class="mx-auto mt-5 inline-block w-auto rounded-md border border-transparent bg-gray-900 px-5 py-3 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10"
              >
                {{ translations['get_started'][props.locale] }} &RightArrow;
              </a>
              <p class="tracking-tight text-white">{{ translations['no_credit_card_required'][props.locale] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
