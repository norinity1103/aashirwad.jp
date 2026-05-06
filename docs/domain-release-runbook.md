# Domain release runbook

## Goal

Release this repository as the official `https://aashirwad.jp/` site on GitHub Pages, then retire the old S3 website hosting path after DNS and HTTPS are stable.

## Current state checked on 2026-05-06

- Repository: `norinity1103/aashirwad.jp`
- Preview URL: `https://norinity1103.github.io/aashirwad.jp/`
- Intended production domain: `aashirwad.jp`
- Current authoritative nameservers are AWS Route 53:
  - `ns-411.awsdns-51.com.`
  - `ns-655.awsdns-17.net.`
  - `ns-1939.awsdns-50.co.uk.`
  - `ns-1458.awsdns-54.org.`
- Current apex `A` records point to AWS/S3-side IPs, not GitHub Pages.

## Repository readiness

- `public/CNAME` contains `aashirwad.jp` so the Pages artifact carries the intended custom domain.
- `public/robots.txt`, `public/sitemap.xml`, canonical URL, OGP URL, and JSON-LD already use `https://aashirwad.jp/`.
- The GitHub Pages workflow publishes the `dist` artifact from `.github/workflows/deploy-pages.yml`.

## GitHub Pages settings

In GitHub:

1. Open `norinity1103/aashirwad.jp`.
2. Go to `Settings` -> `Pages`.
3. Set `Custom domain` to `aashirwad.jp`.
4. After DNS resolves, enable `Enforce HTTPS`.
5. If GitHub reports the domain is already in use, remove the custom domain from any old Pages repository first.

## DNS target records

At the active DNS provider, set the apex domain:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

For `www`:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `norinity1103.github.io` |

Do not include the repository path in DNS records. Use `norinity1103.github.io`, not `norinity1103.github.io/aashirwad.jp`.

## Suggested migration sequence

1. Keep the domain in Route 53 until GitHub Pages custom domain setup is complete.
2. In GitHub Pages settings, add `aashirwad.jp` as the custom domain.
3. In the current Route 53 hosted zone, change DNS records from S3 to the GitHub Pages records above.
4. Confirm:
   - `dig aashirwad.jp +noall +answer -t A`
   - `dig aashirwad.jp +noall +answer -t AAAA`
   - `dig www.aashirwad.jp +nostats +nocomments +nocmd`
   - `curl -I https://aashirwad.jp/`
5. Enable `Enforce HTTPS` in GitHub Pages after GitHub allows it.
6. After the new site is stable, transfer the domain registrar from Route 53/AWS Registrar to onamae.com if desired.
7. After registrar transfer and DNS stability are confirmed, remove the unused S3 website bucket / CloudFront / Route 53 hosted zone only if no other records depend on them.

## Notes

- DNS changes can take up to 24 hours to propagate.
- Avoid wildcard DNS records such as `*.aashirwad.jp`.
- If mail records are added later, preserve MX/TXT records during registrar or DNS provider changes.

## References

- GitHub Docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
