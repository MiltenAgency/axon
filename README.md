# Jace landing page — Next.js

A responsive recreation of the public [Jace landing page](https://jace.ai/), built with Next.js App Router, React, and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run typecheck
npm run build
```

The project uses a static export. The production files are generated in `out/` and can be served by any static host. For a production preview, run `npx serve out` after building.

## Included

- Responsive hero, original local fonts, logos, and product imagery
- Feature sections and interactive product preview
- Testimonial carousel
- Monthly and yearly pricing toggle
- Accessible FAQ accordion
- Native signup dialog with keyboard focus management and Escape dismissal
- Security, comparison, and footer sections
- Branded favicon, social metadata, and 404 page
- Reduced motion support and keyboard focus indicators

This is a frontend recreation, not the Jace email service. Login, signup, sales, legal, and company links point to the original Jace services. The page does not collect credentials or connect mailboxes. Original branding and assets belong to their respective owners.

The clone is marked `noindex` to avoid competing with the original site in search results.
