# github-tree

> Test project for Elonsoft

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Heroku deploy

```bash
$ npm i -g heroku-cli
$ heroku login

$ cd github-commit-history
$ heroku apps:create github-commit-history
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs.git
$ heroku buildpacks:add --index 2 https://github.com/heroku/heroku-buildpack-static.git --app github-commit-history
$ git push heroku master
```

Automatic deploys from `master` branch are enabled. 
