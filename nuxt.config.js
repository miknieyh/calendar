const webpack = require("webpack")
require('dotenv').config()
module.exports = {
  env : {
    URL : 'http://localhost:3000/api',
    SERVICE_KEY : '?_type=json&ServiceKey=pttHWIl4dfMuWu4ZBaBagNtAzamjrs%2BMGE9JDETUED7tu4y1Dt8ajPP7qmxXBJZQTLLhFHjZ84EkuMHfkxZcnA%3D%3D&solYear=',
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: 3000,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  axios: {
    proxy: false,
    prefix: process.env.API_URI
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api': {
      target: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'calendar',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  router: {
    mode: `history`,
    extendRoutes(routes, resolve) {
      routes.length = 0
      routes.push({
        path: "/Calendar",
        component: resolve(__dirname, 'pages/Calendar.vue'),
        name: "Calendar"
      })
      routes.push({
        path: "/SearchScreen",
        component: resolve(__dirname, 'pages/SearchScreen.vue'),
        name: "SearchScreen",
      })
      routes.push({
        path: "/InputScreen",
        component: resolve(__dirname, 'pages/InputScreen.vue'),
        name: "InputScreen",
      })
      routes.push({
        path: "/",
        component: resolve(__dirname, 'pages/Home.vue'),
        name: "Home"
      })
    },
    /*
    ** Build configuration
    */
    build: {
      plugins: [
        new webpack.ProvidePlugin({
          "_": "lodash",
        })

      ],
      /*
      ** Run ESLint on save
      */
      extend(config, {isDev, isClient}) {
        if (isDev && isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      }
    }
  }
}

