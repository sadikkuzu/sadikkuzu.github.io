# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal Jekyll site served by GitHub Pages at https://sadikkuzu.com (custom domain via `CNAME`). GitHub Pages builds `master` itself — there is no build workflow in `.github/workflows/`. The only workflow there is a scheduled HTTP health check against the live domain.

## Local development

```
docker compose up -d
open http://localhost:4000
docker compose down
```

- No local Ruby/bundler is used. The `starefossen/github-pages` image supplies the gem set; `Gemfile` only pins `jekyll ~> 3.8.5` and `Gemfile.lock` is gitignored.
- Jekyll's watcher does not reload `_config.yml`. After editing it, restart the container.

## Constraints

- Only plugins on the GitHub Pages whitelist work. Do not add gems or `plugins:` entries that Pages will not build.
- Front matter is required on any file Jekyll must process — `index.md` and `404.html` are just front matter plus content, using `layout: sadikkuzu`.

## Repo layout

- `_layouts/sadikkuzu.html` — the single layout; pulls in `_includes/{header,footer,ga}.html`.
- `_includes/header.html` — holds all page CSS inline plus CDN links (Bootstrap 3.3.7, Font Awesome 6, Google Fonts).
- `_data/socials.yml` — social links rendered by `_includes/footer.html`; edit here, not in the footer markup.
- `_includes/og.html` — Open Graph tags, hardcoded (not driven by `_config.yml`).

## Workflow

- Changes go directly to `master`; pushing triggers the Pages rebuild. The only PRs are pre-commit.ci autoupdate bot PRs.
- `pre-commit` runs `end-of-file-fixer`, `trailing-whitespace`, `check-yaml`, `check-merge-conflict`. Keep trailing newlines and no trailing whitespace, or CI (pre-commit.ci) fails.
