module.exports = {
  devServer: {
        
      port: 8080,
      after: function(app, server, compiler) {
          console.log("test");
      },
      allowedHosts: [
          '.vuespa.local',
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
