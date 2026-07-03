# Bacha's Birthday — from Kritik 🤍

A romantic, animated Next.js birthday page.

## What's inside
- A sealed **envelope entrance** — the page stays hidden until it's tapped open, with a confetti burst of petals
- A **blooming orchid** animation and gradient name reveal
- A **live countdown** to July 5, 2026 (auto-switches to a birthday message once it hits zero)
- A **hidden secret note** — tap the small orchid in the message section to reveal an extra line, signed by Kritik
- Ambient floating petals throughout, in a lavender / turquoise / black & white palette
- Fully responsive, respects reduced-motion preferences

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy it (so you can just send her a link)
The easiest option is [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

Follow the prompts — it'll give you a live URL in under a minute.

## Customize
- **Countdown date** — `TARGET_DATE` near the top of `app/page.js`
- **Message text** — inside the `<p className="letter">` block in `app/page.js`
- **Secret note** — inside `<div className="secret">` in `app/page.js`
- **Colors** — CSS variables at the top of `app/globals.css`
