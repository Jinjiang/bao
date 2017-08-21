rm -Rf _book
gitbook build
cd _book
git init
git add -A
git commit -m "update book"
git push -f git@github.com:Jinjiang/dabao.git master:gh-pages
