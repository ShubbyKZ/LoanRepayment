# NZ Mortgage Affordability Model

A lightweight local app to estimate mortgage affordability in New Zealand.

## What it does

- Inputs recurring costs such as electricity, rates, insurance, internet, groceries, and custom items.
- Inputs salary before tax and calculates after-tax income under NZ rules.
- Calculates mortgage repayment amounts by week, fortnight, and month from house price/deposit/rate/term.
- Shows projected surplus or deficit after mortgage + recurring costs.

## Tax assumptions in this model

- PAYE tax brackets (effective from **1 April 2025**):
  - 10.5%: NZD 0 to 15,600
  - 17.5%: NZD 15,601 to 53,500
  - 30%: NZD 53,501 to 78,100
  - 33%: NZD 78,101 to 180,000
  - 39%: over NZD 180,000
- ACC earners levy: **1.67%** on liable earnings up to **NZD 152,790**.
- Optional student loan deduction: 12% above NZD 24,128.
- Optional KiwiSaver employee deduction.

## Run

Open `/Users/shubby-kz/Projects/Mortgage model/index.html` in your browser.

No package installation is required.

## Share online (recommended)

### Option A: Netlify (fastest)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag this folder into the page:
   `/Users/shubby-kz/Projects/Mortgage model`
3. Netlify will generate a public URL like `https://xxxx.netlify.app`
4. Share that URL.

### Option B: Vercel

1. Push this project to a GitHub repo.
2. Go to [Vercel](https://vercel.com/new) and import the repo.
3. Deploy with defaults (this project is static and includes `vercel.json`).
4. Share the generated Vercel URL.

### iOS / Android app-like usage

- Open the public URL in Safari or Chrome.
- Use **Add to Home Screen** for app-like launch.

## Supplier fee extraction (optional)

`/Users/shubby-kz/Projects/Mortgage model/supplier_fee_fetcher.mjs` is a small helper that:

- Fetches supplier pricing pages from URLs in `supplier-config.sample.json`
- Applies regex patterns to find fee values
- Saves output to `supplier-fees-output.json`

### Usage

1. Copy and edit the sample config:

```bash
cp supplier-config.sample.json supplier-config.json
```

2. Update each supplier URL and regex pattern.

3. Run:

```bash
node supplier_fee_fetcher.mjs supplier-config.json
```

## Notes

- Some supplier sites block bots, need login, or render prices with JavaScript; those may return `no_match`.
- Use this model for planning only; confirm with a mortgage adviser for lending decisions.
