THEME_VERSION ?= latest

.PHONY: theme-clean
theme-clean:
	rm -rf themes/hugo-geekdoc

.PHONY: theme-sync
theme-synv:
	mkdir -p themes/hugo-geekdoc; \
  curl -sSL https://github.com/xoxys/hugo-geekdoc/releases/$(THEME_VERSION)/download/hugo-geekdoc.tar.gz | tar -xz -C themes/hugo-geekdoc/ --strip-components=1

.PHONY: theme
theme: theme-clean theme-synv
