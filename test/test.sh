echo "\n>> Build\n"
cd ..
cake build
cd test

echo "\n>> Test Stylus\n"
stylus test.styl
cat test.css

echo "\n>> Test Less\n"
lessc test.less
cat test.css
