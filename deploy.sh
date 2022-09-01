#!/usr/bin/env sh

set -env

npm run build

cd dist

git init

git checkout -b main

git add -add

git commit -m 'deploy'

git push -f git@github.com:haroldwgc/budget-app.git main:gh-pages