BROWSERIFY = browserify
UGLIFY = node_modules/.bin/uglifyjs

run:
	wzrd app.js:index.js -- \
		-d

build:
	$(BROWSERIFY) app.js | $(UGLIFY) -c -m -o index.js

pushall:
	git push origin master && git push origin gh-pages
