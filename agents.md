# agents.md -- ownCloud Developer Documentation

## Repository Overview

Hugo-based source for owncloud.dev, the ownCloud developer documentation site. Licensed under Apache-2.0.

## Architecture & Key Paths

- `config.yaml` -- Hugo site configuration
- `config/` -- Additional Hugo config
- `layouts/` -- Hugo layout templates
- `static/` -- Static assets
- `assets/` -- Hugo asset pipeline files
- `Makefile` -- Build and dev server automation

## Development Conventions

- Hugo static site generator
- Markdown content
- Theme synced from external source

## Build & Test Commands

```bash
make theme-sync               # Sync Hugo theme
make hugo-server              # Start local dev server
make hugo-build               # Build static site
make clean                    # Clean build artifacts
```

## Important Constraints

- Licensed under Apache-2.0 (already at the OSPO target license). The broader ownCloud organization is migrating other repositories from copyleft licenses to Apache 2.0.
- Do not introduce new **copyleft-licensed dependencies** (GPL, AGPL, LGPL, MPL) without explicit discussion in an issue first. This is especially important for repos that are migrating to or already under Apache 2.0, as copyleft dependencies would block or complicate that migration.
- All contributions require a DCO sign-off.


## OSPO Policy Constraints

### GitHub Actions
- **Only** use actions owned by `owncloud`, created by GitHub (`actions/*`), verified on the GitHub Marketplace, or verified by the ownCloud Maintainers.
- Pin all actions to their full commit SHA (not tags): `uses: actions/checkout@<SHA> # vX.Y.Z`
- Never introduce actions from unverified third parties.

### Dependency Management
- Dependabot is configured for automated dependency updates.
- Review and merge Dependabot PRs as part of regular maintenance.
- Do not introduce new dependencies without discussion in an issue first.

### Git Workflow
- **Rebase policy**: Always rebase; never create merge commits. Use `git pull --rebase` and `git rebase` before pushing.
- **Signed commits**: All commits **must** be PGP/GPG signed (`git commit -S -s`).
- **DCO sign-off**: Every commit needs a `Signed-off-by` line (`git commit -s`).
- **Conventional Commits & Squash Merge**: Use the [Conventional Commits](https://www.conventionalcommits.org/) format where the repository enforces it. Many repos use squash merge, where the PR title becomes the commit message on the default branch — apply Conventional Commits format to PR titles as well. A reusable GitHub Actions workflow enforces this.

## Context for AI Agents

This is a Hugo static site. Content is written in Markdown. The theme is synced externally. The generated site is published to owncloud.dev via GitHub Pages.
