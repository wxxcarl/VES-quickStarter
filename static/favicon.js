'use strict';
var childCompiler = require('./compiler.js');

function FaviconPlugin(ops) {
    this.options = {
        prefix: 'icons-[hash]/',
        emitStats: false,
        statsFilename: 'iconstats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#fff'
    }
    if (typeof ops === 'string') {
        this.options.logo = ops
    } else {
        this.options.logo = 'favicon.ico'
    }
}

FaviconPlugin.prototype.apply = function (compiler) {
  var self = this;

  // Generate the favicons
  var compilationResult;
  compiler.plugin('make', function (compilation, callback) {
    childCompiler.compileTemplate(self.options, compiler.context, compilation)
      .then(function (result) {
        compilationResult = result;
        callback();
      })
      .catch(callback);
  });

  // Hook into the html-webpack-plugin processing
  // and add the html
  compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
          htmlPluginData.html = htmlPluginData.html.replace( /(<\/head>)/i, compilationResult.stats.html.join('') + '$&');
          callback(null, htmlPluginData)
      })
  })

  // Remove the stats from the output if they are not required
    compiler.plugin('emit', function (compilation, callback) {
      delete compilation.assets[compilationResult.outputName];
      callback();
    })
};

module.exports = FaviconPlugin;
