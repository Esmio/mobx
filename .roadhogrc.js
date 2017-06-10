const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets/svgs'),  // 业务代码本地私有 svg 存放目录
];


export default {
  entry: "src/index.js",
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }],
      ]
    }
  },
  proxy : {
    "/api" : {
      "target" : "http://192.168.1.93:7500",
      "changeOrigin" : "true",
      "pathRewrite" : {"" : ""}
    }
  },
  svgSpriteLoaderDirs: svgSpriteDirs
}