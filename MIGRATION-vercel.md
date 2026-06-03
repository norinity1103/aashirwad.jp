# GitHub Pages → Vercel 移行メモ

このブランチ（`chore/migrate-to-vercel`）で行った変更と、マージ前に必要な手作業。

## 背景

本サイトは Vite 製の静的サイトで、これまで **GitHub Pages** へデプロイしていた
（`scripts/prepare-github-pages.mjs` で `/assets/` を相対パスに書き換え、`.github/workflows/deploy-pages.yml` で公開）。
デプロイ先は Vercel に統一する（[[R004_デプロイ標準]]）。

## 変更点（このブランチ）

| 種別 | 内容 |
|---|---|
| 追加 | `vercel.json` — framework: vite / build: `npm run build` / output: `dist` |
| 削除 | `.github/workflows/deploy-pages.yml`（GitHub Pages への自動デプロイ） |

## ポイント

- Vercel はルートドメイン配信のため、Vite 既定の絶対パス `/assets/` がそのまま使える。
  → GitHub Pages 用の `build:pages`（`prepare-github-pages.mjs` による相対パス化）は**不要**。Vercel は `build`（`vite build`）を使う。
- `scripts/prepare-github-pages.mjs` と `build:pages` スクリプトはGitHub Pages用に残置（参照用）。Vercel では使われない。気になれば後日削除。
- `public/CNAME` はGitHub Pages用のカスタムドメイン指定。Vercel では無視される（ドメインは Vercel ダッシュボードで設定）。害はないが、GitHub Pages を完全停止後に削除してよい。

## マージ前にやること（手作業）

1. Vercel に New Project → 当リポジトリを Import（Vite 自動検出 / `vercel.json` でも明示）。
2. プレビューデプロイで表示・i18n・主要導線を確認（`npm run check` 相当）。
3. カスタムドメインを Vercel に設定し、DNS を向け替え。
4. 旧 GitHub Pages を無効化（Settings → Pages → Source を None）。

## ロールバック

このブランチを破棄すれば GitHub Pages 構成に戻る（`main` は無変更）。
