const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const path=require("path");

if(typeof require !== 'undefined'){
  require.extensions['.css']=file=>{}
}

module.exports = withCss({
  ...withLess(
  {
    lessLoaderOptions: {
      javascriptEnabled: true,
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",

    },
    distDir: 'build',
      // https://blog.csdn.net/weixin_40532650/article/details/113177566
    // 解决png图片import的问题
    webpack: (config)=>{
      config.resolve.alias["@"] = path.resolve(__dirname);
      config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /.*\.png.*/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "static/media/[name].[hash:8].[ext]",
          },
        });
        return config;
  },
  }
)})  