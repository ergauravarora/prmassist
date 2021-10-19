const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

function start(cb){    
    nodemon({
        script: './bin/www'
    });

    cb();
}


exports.default = start;
