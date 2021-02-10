const ISO6391 = require('iso-639-1')
const hubdown = require('hubdown')
const locales = ISO6391.getAllCodes()
let output = ''

function log(line) {
  // console.log(line)
  output = output + line + '\n'
}

async function main () {
  
  for (const locale of locales) {
    const getEnglishName = new Intl.DisplayNames('en', { type: 'language' })
    log(`\n\n## ${locale}\n\n`)
  
    for (const sublocale of locales) {
      const getName = new Intl.DisplayNames(sublocale, { type: 'language' })
      log(`- ${getName.of(locale)} (${getEnglishName.of(sublocale)})`)
    }
    log('\n---\n')
  }

  // console.log(output)
  const { content } = await hubdown(output)
  console.log(content)
}


main()