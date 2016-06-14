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

cacheLibrary('gulp');
cacheLibrary('gulp-less');
cacheLibrary('gulp-sass');
cacheLibrary('gulp-stylus');
cacheLibrary('gulp-util');
cacheLibrary('gulp-babel');
cacheLibrary('gulp-ignore');
cacheLibrary('gulp-sourcemaps');
cacheLibrary('gulp-live-server');
cacheLibrary('gulp-autoprefixer');
cacheLibrary('babel-preset-es2015');

let franky =  require('franky-core')
  , gulp = require('gulp')
  , GulpRoutines = franky.getGulpRoutines()
  , config = require(__dirname+'/app/config.js')
  , gr = new GulpRoutines(__dirname+'/app', config, true)
  ;

gr.assembleRoutines(gulp);

