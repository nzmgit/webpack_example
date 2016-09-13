// gulp用于控制执行流程，webpack用于处理复杂引用的依赖
var gulp = require('gulp');
// 删除文件和目录
var del = require('del');
// 按顺序执行
var gulpSequence = require('gulp-sequence');
// 引入webpack的本地模块
var webpack = require("webpack");
// 引入wbpack的配置文件
var webpackConfig = require("./webpack.publish.config.js");

gulp.task('default',['sequence'], function() {
    console.log("项目构建成功");
});

// 流程控制
gulp.task('sequence', gulpSequence('clean','webpack'));

// 删除文件和文件夹
gulp.task('clean', function(cb) {
    //del('dist);// 不推荐使用
    del(['dist/js','dist/css','dist/img','dist/*.html']);
    return cb();
});

// gulp 负责任务流程部分的操作，webpack负责复杂模块系统的引用分离工作
gulp.task('webpack', function(cb) {

        // 执行webpack的构建任务
        webpack(webpackConfig, function (err, stats) {
            if (err){
                console.log("构建任务失败");
            }else{
                cb();
            }
        });
});