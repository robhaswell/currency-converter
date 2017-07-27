const rateClient = require('../lib/rate-client')

function calculate (state) {
  state.result = state.amount * (state.rates[state.currencyTo] || 1)
  return state
}

module.exports = {
  state: {
    amount: 0,
    currencyFrom: 'EUR',
    currencyTo: 'GBP',
    result: 0,
    rates: {}
  },
  reducers: {
    updateSourceCurrency: (state, data) => {
      state.currencyFrom = data
      state = calculate(state)
      return state
    },
    updateTargetCurrency: (state, data) => {
      state.currencyTo = data
      state = calculate(state)
      return state
    },
    updateRates: (state, data) => {
      state.rates = data
      state = calculate(state)
      return state
    },
    convert: (state, data) => {
      state.amount = data
      state = calculate(state)
      return state
    },
    swapState: (state) => {
      state = Object.assign(state, {
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom,
        amount: state.result,
        result: state.amount
      })
      return state
    }
  },
  effects: {
    updateBaseRate: (state, data, send, done) => {
      send('updateSourceCurrency', data, (err) => {
        if (err) {
          // ???
        }
      })
      rateClient(data, (err, res) => {
        if (err) {
          // TODO: Write to the error handling div
          return done(err)
        }
        send('updateRates', res.rates, (err, value) => {
          if (err) {
            return done(err)
          }
          done(null, value)
        })
        done()
      })
    },
    swap: (state, data, send, done) => {
      send('swapState', (err, state) => {
        if (err) {
          return done(err)
        }
        send('updateBaseRate', state.currencyFrom, (err) => {
          if (err) {
            return done(err)
          }
          document.getElementById('input').value = state.amount
          return done
        })
      })
    }
  },
  subscriptions: {
    'called-once-when-the-app-loads': function (send, done) {
      send('updateBaseRate', 'EUR', done)
    }
  }
}
