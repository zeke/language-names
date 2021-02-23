const fs = require('fs')
const path = require('path')
const { chain, values } = require('lodash')
const cheerio = require('cheerio')
const data = fs.readFileSync(path.join(__dirname, './unicode-cldr-supplemental-data.xml'), 'utf-8')

const $ = cheerio.load(data, {xmlMode: true})

const languages = $('language[territories]')
  .map((i, el) => {
    console.log($(el).attr('type'))
    console.log($(el).attr('territories'))
    return {
      type: $(el).attr('type'),
      territories: $(el).attr('territories')
    }
  })
  .get()

const sorted = chain(languages)
  .orderBy('territories.length', 'desc')
  .value()

console.log({sorted})

{/* <language type="ar" scripts="Arab" territories="AE BH DJ DZ EG EH ER IL IQ JO KM KW LB LY MA MR OM PS QA SA SD SO SY TD TN YE"/> */}
