// server.js
const express = require('express')
const sitemap =  require("nextjs-sitemap-generator");
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware');

sitemap({
    baseUrl: "https://ximouzhao.com",
    // If you are using Vercel platform to deploy change the route to /.next/serverless/pages 
    pagesDirectory: __dirname + "/build/server/pages",
    targetDirectory: "public/",
    ignoredExtensions: ["js", "map"],
    ignoredPaths: ["assets","admin"], // Exclude everything that isn't static page
  });
  

const devProxy = {
    '/api': {
        target: 'http://home.ximouzhao.com:18080', // 端口自己配置合适的
        // pathRewrite: {
        //     '^/api': '/'
        // },
        changeOrigin: true
    }
}

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        if (dev && devProxy) {
            Object.keys(devProxy).forEach(function(context) {
                server.use(createProxyMiddleware(context, devProxy[context]))
            })
        }

        server.all('*', (req, res) => {
            // if(req.url == '/_next/image?url=%2Fapi%2Ffiles%2Fbace05e84e4eb616e550f46cd16296a4.png&w=828&q=75'){
            //     console.log(req)
            // }
            handle(req, res)
        })

        server.listen(port, err => {
            if (err) {
                throw err
            }
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
    })