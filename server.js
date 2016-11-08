import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match } from 'react-router'
import { RouterContext } from 'react-router'
import routes from './assets/javascripts/routes'

import { Promise } from 'es6-promise'
import { Provider } from 'react-redux'
import configureStore from "./redux/configureStore"

import usersController from "./controllers/users"
import moviesController from "./controllers/movies"
import { fetchComponentDataBeforeRender } from './redux/fetchComponentDataBeforeRender'

const app = express()

app.use(compression())
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// 从mongodb中Fetch数据
app.get('/api/movies', moviesController.index)
app.get('/api/movies/:id', moviesController.show)


// 根据react-router路由加载组件
app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore()
      const state = store.getState()
      const params = Object.assign(req.query, renderProps.params)

      fetchComponentDataBeforeRender(store.dispatch, renderProps.components, params)
      .then(() => {
        // 这里redux的store给Provider，再通过mapStateToProps给对应的容器组件
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        res.end(renderFullPage(html, store.getState()));
      })
    } else {
      res.status(404).end('Not found');
    }
  })
})

// 渲染页面
const renderFullPage = (appHtml, initialState) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>哩噜电影</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- styles -->

  </head>
  <body>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <div id="app">
      ${appHtml}
    </div>
  </body>

  <script type="text/javascript" src="http://localhost:8080/javascripts/bundle.js" charset="utf-8"></script>
  <script type="text/javascript" src="http://localhost:3003/javascripts/common.js" charset="utf-8"></script>
  <script type="text/javascript" src="http://localhost:3003/javascripts/bundle.js" charset="utf-8"></script>
  </html>
  `
}

// 服务监听
const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, () => {
  let host = server.address().address
  let port = server.address().port
  console.log('Express server listening at http://%s:%s', host, port)
})
