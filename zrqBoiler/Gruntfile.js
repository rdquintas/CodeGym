module.exports = function(grunt) {

    var _js_libs = [
        "bower_components/echojs/dist/echo.min.js",
        "bower_components/superfish/dist/js/hoverIntent.js",
        "bower_components/superfish/dist/js/superfish.min.js"
    ];

    var _js_custom = [
        'user/themes/zrq/js/app.js'
    ];

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-rename');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-copy');


    // ================================
    // Task:    default
    // ================================
    grunt.registerTask('default', [
        // 'concat:js_libs',
        'jshint:js_custom',
        'concat:js_libs',
        'concat:js_custom',
        // 'uglify:js_custom',
        'less:css_custom'
        // 'copy:purecss',
        // 'cssmin:css_custom'
    ]);


    // ================================
    // Task:    prod
    // ================================    
    grunt.registerTask('prod', [
        // 'concat:js_libs',
        // 'jshint:js_custom',
        // 'concat:js_custom',
        // 'uglify:js_custom',
        // 'libsass:css_custom',
        // 'copy:purecss',
        // 'cssmin:css_custom'
    ]);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // ================================
        // WATCH me now
        // ================================          
        watch: {
            js_custom: {
                files: _js_custom,
                tasks: [
                    'jshint:js_custom',
                    'concat:js_custom'
                ],
                options: {
                    event: ['all'],
                    interrupt: true
                }
            },
            css_custom: {
                files: "user/themes/zrq/less/*.less",
                tasks: [
                    'less:css_custom'
                ],
                options: {
                    event: ['all'],
                    interrupt: true
                }
            }
        },


        // ================================
        // LESS
        // ================================  
        less: {
            css_custom: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: "user/themes/zrq/css/app.dist.css.map",
                    cleancss: false,
                    compress: false
                },
                files: {
                    "user/themes/zrq/css/app.dist.css": "user/themes/zrq/less/start_here.less"
                }
            }
        },

    
        // ================================
        // JSHINT
        // ================================          
        jshint: {
            js_custom: {
                src: _js_custom
            }
        },


        // ================================
        // CONCAT
        // ================================          
        concat: {
            js_libs: {
                src: _js_libs,
                dest: 'user/themes/zrq/js/libs.dist.js'
            },
            js_custom: {
                src: _js_custom,
                dest: 'user/themes/zrq/js/app.dist.js'
            }
        }


        // // ================================
        // // UGLIFY: JS minify
        // // ================================  
        // uglify: {
        //     js_custom: {
        //         src: 'js/app.dist.js',
        //         dest: 'js/app.dist.js'
        //     }
        // },


        // // ================================
        // // CSSMIN
        // // ================================        
        // cssmin: {
        //     css_custom: {
        //         files: {
        //             'css/style.dist.css': ['css/style.dist.css']
        //         }
        //     }
        // },


        // // ================================
        // // COPY: Copy files
        // // ================================  
        // copy: {
        //     purecss: {
        //         src: 'bower_components/pure/pure-min.css',
        //         dest: 'css/pure-min.css'
        //     }
        // },


        // // ================================
        // // CLEAN: Deletes files
        // // ================================          
        // clean: ['js/<%= pkg.name %>.js'],


        // // ================================
        // // RENAME: Rename files
        // // ================================          
        // rename: {
        //     // css: {
        //     //     files: [{
        //     //         src: 'css/teste.css',
        //     //         dest: 'css/teste.min.css'
        //     //     }]
        //     // }
        // },


        // // ================================
        // // connect: HTTP server
        // // ================================
        // connect: {
        //     server: {
        //         options: {
        //             port: 8080,
        //             keepalive: true
        //         }
        //     }
        // }

    });
};
