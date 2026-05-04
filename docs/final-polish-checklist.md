# Final polish checklist

Use this checklist when the site enters the final UI shaping and shipment phase.

## Brand and First Impression

- The first viewport clearly communicates the restaurant name, place, cuisine, and primary action.
- The hero image supports the actual dining experience, not a generic mood.
- The logo, typography, icons, and colors feel like the same brand system.
- Important Japanese headings use intentional editorial line breaks.

## Conversion and Behavior

- Primary actions are visible without searching: menu, call, map.
- PC has a restrained fixed CTA that does not cover essential content.
- Mobile has a bottom quick action bar with large enough tap targets.
- CTA labels are short and action-oriented.
- Footer repeats essential contact information for users who reach the bottom.

## Information Architecture

- Weak or overlapping sections are merged instead of repeated.
- Shop data is factual, compact, and avoids unconfirmed claims.
- Menu prices and detailed items stay in PDFs unless confirmed for HTML display.
- Navigation labels match the actual sections and do not overpromise.

## Visual Detail

- Section rhythm is consistent: heading, lead, content.
- Cards are used for repeated items only, not as decorative wrappers.
- Images have stable dimensions and do not cause layout shifts.
- Hover and focus states are visible but not loud.
- Decorative motion is avoided unless it improves clarity.

## Responsive and i18n

- Japanese and English views both fit their containers.
- Desktop screenshots are checked for line breaks, CTA placement, and section balance.
- Mobile screenshots are checked for tap targets, fixed bars, and text wrapping.
- Translation keys cover text, attributes, alt text, and aria labels.

## Verification

- `npm run check`
- `npm run screenshots`
- Review `.artifacts/screenshots/desktop.png`
- Review `.artifacts/screenshots/desktop-en.png`
- Review `.artifacts/screenshots/mobile.png`
- Review `.artifacts/screenshots/mobile-en.png`
