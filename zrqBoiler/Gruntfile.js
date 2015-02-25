module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenation
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            js: {
                src: [
                    'js/src/z_<%= pkg.name %>.js',
                    'js/src/*.js'
                ],
                dest: 'js/<%= pkg.name %>.js',
            },
            css: {
                src: [
                    'css/src/z_<%= pkg.name %>.css',
                    'css/src/*.css'
                ],
                dest: 'css/<%= pkg.name %>.css',
            }
        },
        uglify: {
            js: {
                src: 'js/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat:js', 'concat:css']);
};
