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
    log(`\n\n## ${getEnglishName.of(locale)}\n\n`)
  
    for (const sublocale of locales) {
      const getName = new Intl.DisplayNames(sublocale, { type: 'language' })
      log(`\nThe ${getEnglishName.of(sublocale)} word for _${getEnglishName.of(locale)}_ is **${getName.of(locale)}**`)
    }
    log('\n---\n')
  }

  const { content: markdown } = await hubdown(output)
  console.log(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <link type="stylesheet" href="/styles.css">
      <style>
        html, body {
          margin: 0;
          padding: 20px;
          font-family: Georgia, 'Times New Roman', Times, serif;
          font-size: 1rem;
        }

        h2 {
          font-weight: normal;
        }
      </style>
    </head>
    <body>
      <h1>Language Names</h1>
  
      <p>Have you ever wondered what the Spanish word for "Greek" is? Or maybe the Italian word for "Japanese"? If so, this page is for you.
      <br><br>
      Built using the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl">Intl API</a> that's built into Node.js versions 14+. Check out the source at <a href="https://github.com/zeke/language-names">github.com/zeke/language-names</a>.</p>
      <br>
      <br>

      ${markdown}
    </body>
  </html>
  `)

}


main()