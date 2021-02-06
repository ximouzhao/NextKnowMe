const path=require("path");



// 解决css 文件引入的问题你
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({
    // https://blog.csdn.net/weixin_40532650/article/details/113177566
    // 解决png图片import的问题
    webpack: (config)=>{
        config.resolve.alias["@"]=path.resolve(__dirname);
        config.module.rules.push({
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          });
          return config;
    }
})