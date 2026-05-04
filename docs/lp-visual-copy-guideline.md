# LP visual copy guideline

This project treats landing-page headings and short supporting copy as visual elements, not only text content.

## Heading Line Breaks

For Japanese section headings, middle headings, hero copy, and compact lead text:

- Prefer manual line breaks where the phrase reads naturally.
- On desktop, control important breaks with `<br class="desktop-break" />`.
- Avoid breaks that split a grammatical unit, such as a noun phrase, location name, or paired expression.
- Keep each line visually balanced, especially in centered headings.
- Re-check both Japanese and English after each copy change.
- Do not rely only on browser auto-wrapping for high-visibility LP headings.

Good:

```html
<h2>ランチからディナーまで、<br class="desktop-break" />気軽に本格派を。</h2>
```

Avoid:

```html
<h2>ランチからディナーまで、気軽に本格派を。</h2>
```

## Review Checklist

- Desktop screenshot: heading breaks look intentional, not accidental.
- Mobile screenshot: forced desktop breaks do not create awkward short lines.
- English mode: translated headings still fit their containers.
- Buttons/cards: text does not overflow or crowd icons.
- Section rhythm: headings, lead text, and cards have enough vertical spacing.

## Reusable AI Prompt

Use this prompt only for LPs, brand pages, restaurants, venues, products, portfolios, and other pages where visual detail and look matter more than purely automatic layout.

```text
このLPでは、見出し・中見出し・短い説明文を単なるテキストではなく、画面上のビジュアル要素として扱ってください。

特に日本語の見出しは、PC表示のスクリーンショットで見たときに文章として美しく読める位置で改行してください。ブラウザの自動折り返し任せにせず、必要に応じて `<br class="desktop-break" />` などのレスポンシブな手動改行を使ってください。

改行では、地名、店名、名詞句、対になる表現、意味のまとまりを不自然に分断しないでください。中央揃えの見出しは各行の長さと視線の流れを整え、左揃えの見出しは余白と行頭のリズムが自然になるようにしてください。

PCとモバイル、日本語と英語の両方をスクリーンショットで確認し、見出し・CTA・カード内テキストが窮屈、過剰、または偶然折れたように見える場合は調整してください。機能実装だけで終わらず、LPとしての見栄え、余白、文字量、改行、画像とのバランスまで検査してください。
```

## Implementation Note

The current CSS hides `.desktop-break` on mobile and enables it on desktop. Use that class for desktop-only editorial breaks unless a mobile-specific adjustment is intentionally needed.
