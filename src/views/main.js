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
  return html`
    <div class="converter">
      <div>
        <div class="base-currency">
          <select>
            ${currencies.map(c => html`<option>${c}</option>`)}
          </select>
          <input class="input" type="number" placeholder="Enter a value…" />
        </div>
        <div class="target-currency">
          <select>
            ${currencies.map(c => html`<option>${c}</option>`)}
          </select>
          <span class="conversion">123</span>
        </div>
        <button>🔃 Swap</button>
      </div>
    </div>
  `
}

const loading = () => html`
  <div class="loading">
    <p>Loading rates…</p>
  </div>
`
