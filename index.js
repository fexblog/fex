'use strict'

function cacheLibrary(name){
  if(!GLOBAL.__libraries){
    GLOBAL.__libraries = {};
  }
  GLOBAL.__libraries[name] = require(name);
}

cacheLibrary('chalk');
cacheLibrary('diskdb');
cacheLibrary('mkdirp');
cacheLibrary('nunjucks');
cacheLibrary('commander');
cacheLibrary("express");
cacheLibrary('body-parser');
cacheLibrary('connect-livereload');

let franky = require("franky-core")
  , Server = franky.Server
  ;

let server = new Server([__dirname, 'app'].join('/'))
  ;
server.start();
