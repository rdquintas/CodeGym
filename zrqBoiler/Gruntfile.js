module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // ================================
    // Task:    default
    // ================================
    grunt.registerTask('default', [
        // 'jshint:dist',
        'browserify:dist',
        // 'uglify:dist',
        'less:dist'
    ]);


    // ================================
    // Task:    prod
    // ================================
    grunt.registerTask('prod', [
        'jshint:dist',
        'browserify:dist',
        'uglify:dist',
        'less:dist'
    ]);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        // ================================
        // WATCH me now
        // ================================          
        watch: {
            browserify: {
                files: "js/*.js",
                tasks: [
                    'browserify:dist',
                    'uglify:dist'
                ],
                options: {
                    event: ['all'],
                    interrupt: true
                }
            },


            less: {
                files: "less/*.less",
                tasks: [
                    'less:dist'
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
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: "css/app.dist.css.map",
                    cleancss: false,
                    compress: false
                },
                files: {
                    "css/app.dist.css": "less/start_here.less"
                }
            }
        },


        // ================================
        // BROWSERIFY
        // ================================  
        browserify: {
            dist: {
                files: {
                    'js/app.dist.js': ['js/app.js']
                }
            }
        },


        // ================================
        // UGLIFY
        // ================================  
        uglify: {
            dist: {
                files: {
                    'js/app.dist.js': ['js/app.dist.js']
                }
            }
        },

        // ================================
        // JSHINT
        // ================================          
        jshint: {
            dist: {
                src: "js/app.js"
            }
        }

    });
};
