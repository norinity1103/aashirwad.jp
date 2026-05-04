# AASHIRWAD source notes

## Used sources

- Current official site: http://aashirwad.jp/
- Current official menu page: http://aashirwad.jp/menu/index.html
- Current official cooks page: http://aashirwad.jp/cooks/index.html
- Current official about page: http://aashirwad.jp/about/index.html
- Instagram account: https://www.instagram.com/aashirwad.kanazawa/
- Tabelog listing: https://tabelog.com/ishikawa/A1701/A170101/17007601/

## Current implementation policy

- Use official site facts first for address, phone, email, seats, opening hours, closed days, menu PDFs, restaurant story, and staff background.
- Use Tabelog as supporting data for cuisine category, external listing link, budget indication, access note, and photo candidates.
- Do not paste long third-party reviews into the public UI. Summarize only factual, non-review claims.
- Payment information currently conflicts between the official site and Tabelog, so the UI says to confirm payment at the shop.
- Instagram remains linked as a source. Direct image import from Instagram should be done after checking the accessible post media in a browser session.
- Asset-level source records are maintained in `docs/asset-registry.md`.
- The HTML menu digest is derived from the extracted text of the four local menu PDFs. Some Japanese lunch PDF text extraction is garbled, so stable English lunch PDF extraction and Japanese/English dinner PDF extraction were prioritized.
