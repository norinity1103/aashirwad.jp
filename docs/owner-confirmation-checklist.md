# Owner confirmation checklist

Confirm these before public launch or production replacement.

## Must confirm

- Payment methods: the official site says credit cards are accepted, while Tabelog says cards are not accepted.
- Opening hours and last-entry wording:
  - Lunch: 11:30-14:30, last entry 14:00
  - Dinner: 18:00-22:00, last entry 21:00
- Closed days: Monday, or the following Tuesday when Monday is a public holiday.
- Whether the current four PDFs are the latest official menus:
  - `public/lunch-japanese.pdf`
  - `public/dinner-japanese.pdf`
  - `public/lunch-english.pdf`
  - `public/dinner-english.pdf`
- Whether the English guide wording is acceptable for inbound visitors.
- Whether the static map fallback is acceptable, or whether production should use an embedded Google Maps iframe.

## Nice to confirm

- Whether reservations should be encouraged by phone or left as a general contact action.
- Whether Instagram photos should be imported directly into the page or kept as an external link.
- Whether food descriptions should include prices on the page or stay PDF-only.
- Whether seasonal/past menu photos should be added to the public page.
- Whether a separate English page is needed later.

## Current safe public choices

- Payment method is not stated definitively; the page says visitors should confirm at the shop.
- Menu prices are not duplicated in HTML; visitors are sent to the PDFs.
- Instagram is linked but no Instagram media has been imported directly.
