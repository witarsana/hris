module.exports = {
  devServer: {
        
      port: process.env.VUE_APP_PORT,
      after: function(app, server, compiler) {
          console.log("test");
      },
      allowedHosts: [
          '.'+process.env.VUE_APP_HOST+'',
      ]
  },
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  
}
