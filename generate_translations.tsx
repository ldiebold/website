import { appendFileSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { load } from 'js-yaml'
import { join } from 'path'

const translations: { [k: string]: { en?: string; fr?: string } } = {}

const loadYmlFiles = (directory: string) => {
  const files = readdirSync(directory)
  files.forEach((file) => {
    const fileName = file.split('.')
    if (fileName[1] === 'yml') {
      const filePath = join(directory, file)
      const content = readFileSync(filePath, 'utf8')
      const data = load(content) as { [p: string]: string }
      Object.keys(data).forEach((key) => {
        if (translations[key]) {
          translations[key] = {
            ...translations[key],
            [fileName[0]]: data[key],
          }
        } else {
          translations[key] = {
            [fileName[0]]: data[key],
          }
        }
      })
    }
  })
}

loadYmlFiles(join(process.cwd(), 'locales'))

const translationFile = join(process.cwd(), 'src', 'services', 'translations.ts')

writeFileSync(translationFile, '', { encoding: 'utf8' })
appendFileSync(translationFile, 'const translations = ', { encoding: 'utf8' })
appendFileSync(translationFile, JSON.stringify(translations), { encoding: 'utf8' })
appendFileSync(translationFile, '; \nexport default translations;', { encoding: 'utf8' })
