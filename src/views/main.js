const html = require('choo/html')
const currencies = require('../lib/currencies')

module.exports = (state, prev, send) => {
  const isLoading = false
  return html`
    <main id="app-root">
      ${isLoading ? loading() : ''}
      ${conversionInterface(state, send)}
    </main>
  `
}

const conversionInterface = (state, send) => {
  function update (e) {
    send('convert', e.target.value)
  }

  function updateBaseRate (e) {
    send('updateBaseRate', e.target.value)
  }
  function updateTargetCurrency (e) {
    send('updateTargetCurrency', e.target.value)
  }

  function swap () {
    send('swap')
  }

  function isSelected (value, desired) {
    return value === desired
  }

  function value () {
    return state.result
  }

  return html`
    <div class="converter">
      <div>
        <div class="base-currency">
          <select onchange=${updateBaseRate}>
            ${currencies.map(c => html`<option selected=${isSelected(c, state.currencyFrom)}>${c}</option>`)}
          </select>
          <input class="input" type="number" placeholder="Enter a value…" oninput=${update} id="input" />
        </div>
        <div class="target-currency">
          <select onchange=${updateTargetCurrency}>
            ${currencies.map(c => html`<option selected=${isSelected(c, state.currencyTo)}>${c}</option>`)}
          </select>
          <span class="conversion">${value()}</span>
        </div>
        <button onclick=${swap}>🔃 Swap</button>
      </div>
    </div>
  `
}

const loading = () => html`
  <div class="loading">
    <p>Loading rates…</p>
  </div>
`
