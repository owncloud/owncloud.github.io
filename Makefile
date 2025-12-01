# renovate: datasource=github-releases depName=thegeeklab/hugo-geekdoc
THEME_VERSION ?= v2.0.0
HUGO_IMAGE = hugomods/hugo:base-0.129.0

# note that we cannot run docker as plain command because make uses sh and the path variable might not have it included.
# we need to find the exact location first so it is available for all shells
DOCKER=$(shell command -v docker)

.PHONY: theme
theme: theme-clean theme-sync

.PHONY: theme-clean
theme-clean:
	rm -rf themes/hugo-geekdoc

.PHONY: theme-sync
theme-sync:
	mkdir -p themes/hugo-geekdoc; \
	curl -sSL https://github.com/thegeeklab/hugo-geekdoc/releases/download/$(THEME_VERSION)/hugo-geekdoc.tar.gz | tar -xz -C themes/hugo-geekdoc/ --strip-components=1

.PHONY: clean
clean:
	rm -rf content public

# create commands to build/serve the site based on the same image that is used for drone.
# because this repo is included during the make doc commands, we can reference the targets and do not need to take
# care on local hugo installs which might have different versions  
.PHONY: hugo-build
hugo-build:
	@echo 'Starting docker container for hugo to build the site'
	@$(DOCKER) run --rm -v $(CURDIR):/src $(HUGO_IMAGE) hugo

.PHONY: hugo-server
hugo-server:
	@echo 'Starting docker container for hugo to serve the site'
	@$(DOCKER) run --rm -p 1313:1313 -v $(CURDIR):/src $(HUGO_IMAGE) hugo server --bind 0.0.0.0
