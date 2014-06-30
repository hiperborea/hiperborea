'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/scripts/{,*/}*.js',
                'app/scripts/vendor/*'
            ]
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.sass-cache',
                        'dist/*'
                    ]
                }]
            }
        },

        useminPrepare: {
            options: {
                dest: 'dist'
            },
            html: 'app/index.html'
        },

        concurrent: {
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        
        compass: {
            options: {
                sassDir:                 'app/scss',
                cssDir:                  '.tmp/styles',
                generatedImagesDir:      '.tmp/images/generated',
                imagesDir:               'app/images',
                javascriptsDir:          'app/scripts',
                fontsDir:                'app/styles/fonts',
                importPath:              'bower_components/foundation/scss',
                httpImagesPath:          '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath:           '/styles/fonts',
                relativeAssets:          false,
                assetCacheBuster:        false
            },
            dist: {
                options: {
                    generatedImagesDir: 'dist/images/generated'
                }
            }
        },

        copy: {
            styles: {
                expand: true,
                dot:    true,
                cwd:    'app/styles',
                dest:   '.tmp/styles/',
                src:    '{,*/}*.css'
            },
            fonts: {
                expand: true,
                dot:    true,
                cwd:    'bower_components/foundation-icon-fonts',
                dest:   'dist/styles',
                src:    '*.{ttf,woff}'
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: 'dist',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: 'dist/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: '*.html',
                    dest: 'dist'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        
        cssmin: {},

        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: 'dist/bower_components/modernizr/modernizr.js',
            files: [
                'dist/scripts/{,*/}*.js',
                'dist/styles/{,*/}*.css',
                '!dist>/scripts/vendor/*'
            ],
            uglify: true
        },

        rev: {
            dist: {
                files: {
                    src: [
                        'dist/scripts/{,*/}*.js',
                        'dist/styles/{,*/}*.css',
                        'dist/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                    ]
                }
            }
        },

        usemin: {
            options: {
                assetsDirs: ['dist']
            },
            html: ['dist/{,*/}*.html'],
            css: ['dist/styles/{,*/}*.css']
        }

/*        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },*/
    });

    grunt.registerTask('default', [
        'jshint',
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'modernizr',
        'copy:dist',
        'copy:fonts',
        'rev',
        'usemin'
    ]);
};

