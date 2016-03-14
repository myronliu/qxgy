var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp .task('packagejs', function(){
  return browserify({entries: './main.js', extensions: ['.js'], debug: true})
    .transform(reactify)//jsx编译成正常的js
    .bundle()
    .on('error',function(err){
      console.error(err.message.red);
      console.error(err.stack.yellow);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./assets/'))
    // .pipe(buffer())
    // .pipe(uglify())
    // .pipe(rename('bundle.min.js'))
    // .pipe(gulp.dest('./assets/'));
})

gulp.task('s', function(){
  nodemon({
    script:'./bin/www',
    ignore: ['./assets/']//添加这句话就可以解决不停的重启问题啦啦啦啦啦～～～～
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})