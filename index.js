const ISO6391 = require('iso-639-1')

const locales = ISO6391.getAllCodes()

for (const locale of locales) {
  console.log(`\n\n## ${locale}\n\n`)

  for (const sublocale of locales) {
    const getEnglishName = new Intl.DisplayNames('en', { type: 'language' })
    const getName = new Intl.DisplayNames(sublocale, { type: 'language' })
    console.log('-', getName.of(locale), `(${getEnglishName.of(sublocale)})`)
  }
  console.log('\n---\n')
}
