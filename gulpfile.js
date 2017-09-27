/*
	gulpfile.js主配置文件，用于定义任务
	此处代码由Node执行

*/

"use strict";
//加载模块

var gulp=require("gulp");
var less=require("gulp-less");
// var cssnano=require("gulp-cssnano");
var cssmin=require("gulp-cssmin");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var imagemin=require("gulp-imagemin");
var clean=require("gulp-clean");
var browserSync=require("browser-sync").create();

//定义一个简单的任务
gulp.task("hello",function(){
	console.log("hello World");
});

//html复制文件的任务
gulp.task("html",function(){
	gulp.src("src/**/*.html")//读取文件
	.pipe(gulp.dest("dist/"));//通过管道再次操作，写入到目标位置
});

//less编译和压缩到任务
gulp.task("less",function(){
	gulp.src("src/less/*.less")
	.pipe(less())//编译
	// .pipe(cssnano())//压缩
	.pipe(cssmin())
	.pipe(gulp.dest("dist/css"));

});

//js合并混淆到任务
gulp.task("js",function(){
	gulp.src("src/js/*.js")
	.pipe(concat("all.js"))//合并
	.pipe(uglify())//压缩混淆
	.pipe(gulp.dest("dist/js"));
});

//image压缩任务
gulp.task("image",function(){
	gulp.src("src/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/images"));//对jpg无效，对png有效
});
//清空之前的内容
gulp.task("clean",function(){
	gulp.src("dist")
	.pipe(clean());
});

//合并任务
gulp.task("dist",["html","less","js","image"])

//定义一个监视任务，监视文件的变化

gulp.task("watch",function(){
	//监视src目录下所有的html文件，当发生变化时自动执行html任务
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/less/*.less",["less"]);
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/images/*",["image"]);


});

// 启动browser－sync静态服务器，实现浏览器的同步

gulp.task("default",["html","js","less","image","watch"],function(){
	browserSync.init({
		server:{
			baseDir:"/dist"
		},
		port:2017
	});
});

