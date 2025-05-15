
#———————————————————————————————————————————————————————————————————————————————
# HEAD

PKG_MGR := $(shell command -v bun 2>/dev/null || command -v pnpm 2>/dev/null || command -v yarn 2>/dev/null || echo npm)

#———————————————————————————————————————————————————————————————————————————————
# BODY
.PHONY: dev

dev:
	$(PKG_MGR) dev
