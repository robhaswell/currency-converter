//
// Provided a currency code (e.g 'USD', 'EUR', 'GBP'), this function
// will make a request to the fixer.io API and retrieve the conversion
// rates for that currency to other currencies.
//
//   usage:
//
//      getRates('EUR', (err, data) => {
//       /* err = an Error if something went wrong */
//       /* otherwise err = null and data = { … } */
//     })
//
module.exports = (baseCurrency, cb) =>
  fetch(`http://api.fixer.io/latest?base=${baseCurrency}`)
    .then(res => res.json())
    .then(json => cb(null, json))
    .catch(err => cb(err))
