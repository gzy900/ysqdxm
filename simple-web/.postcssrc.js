// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "autoprefixer": {},
    "postcss-px2rem": require('postcss-px2rem')({ remUnit: 75 })
  }
}
