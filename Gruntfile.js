'use strict';

module.exports=function(grunt){
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean:{
            server:'.tmp'
          , dist:{
                files:[{
                    dot:true
                  , src:[
                        '.tmp'
                      , 'dist/*'
                    ]
                }]
            }
        }
      , replace:{
            app:{
                options:{
                    variables:{
                        ember:'vendor/ember/ember.js'
                      , ember_data:'vendor/ember-data/ember-data.js'
                    }
                }
              , files:[{
                    src:'app/index.html'
                  , dest:'.tmp/index.html'
                }]
            }
          , dist: {
                options:{
                    variables:{
                        ember:'vendor/ember/ember.min.js',
                        ember_data:'vendor/ember-data/ember-data.min.js'
                    }
                }
              , files:[{
                    src:'app/index.html'
                  , dest:'.tmp/index.html'
                }]
            }
        }
      , concurrent:{
            server:[
                'emberTemplates'
              , 'less:server'
            ]
          , dist:[
                'emberTemplates'
              , 'less:dist'
              , 'symlink'
              , 'imagemin'
              , 'svgmin'
              , 'htmlmin:dist1'
            ]
        }
      , emberTemplates:{
            options:{
                templateName:function(sourceFile){
                    return sourceFile.replace('app/templates/','');
                }
            }
          , dist:{
                files:{
                '.tmp/scripts/compiled-templates.js':'app/templates/**/*.hbs'
                }
            }
        }
      , neuter:{
            app:{
                options:{
                    filepathTransform:function(filepath){
                        return 'app/'+filepath;
                    }
                }
              , src:'app/scripts/app.js'
              , dest:'.tmp/scripts/combined-scripts.js'
            }
        }
      , less:{
            server:{
                options:{
                    dumpLineNumbers:'all'
                  , paths:['bower_components']
                }
              , files:{
                    '.tmp/styles/style.css':'app/styles/style.less'
                }
            }
          , dist:{
                options:{
                    cleancss:true
                  , paths:['bower_components']
                }
              , files:{
                    '.tmp/styles/style.css':'app/styles/style.less'
                }
            }
        }
      , connect:{
            options:{
                port:9000
              , livereload:35729
              , hostname:'localhost'
            }
          , livereload:{
                options:{
                    base:['app']
                  , middleware:function(connect){
                        return [
                            connect.static('.tmp')
                          , connect.static('app')
                          , connect().use('/vendor',
                                connect.static('bower_components'))
                        ];
                    }
                }
            }
        }
      , watch:{
            emberTemplates:{
                files:'app/templates/**/*.hbs'
              , tasks:['emberTemplates']
            }
          , neuter:{
                files:['app/scripts/{,*/}*.js']
              , tasks:['neuter']
            }
          , less:{
                files:['app/styles/{,*/}*.less']
              , tasks:['less:server']
            }
          , livereload:{
                options:{
                    livereload:'<%= connect.options.livereload %>'
                }
              , files:[
                    '.tmp/scripts/*.js'
                  , '.tmp/styles/*.css'
                  , '.tmp/*.html'
                  , 'app/*.html'
                ]
            }
        }
      , useminPrepare:{
            html:'.tmp/index.html',
            options:{
                dest:'dist'
            }
        }
      , symlink:{
            options:{
                overwrite:false
            }
          , explicit:{
                src:'bower_components'
              , dest:'.tmp/vendor'
            }
        }
      , imagemin:{
            dist:{
                files:[{
                    expand:true
                  , cwd:'app/images'
                  , src:'{,*/}*.{png,jpg,jpeg}'
                  , dest:'dist/images'
                }]
            }
        }
      , svgmin:{
            dist:{
                files:[{
                    expand:true
                  , cwd:'app/images'
                  , src:'{,*/}*.svg'
                  , dest:'dist/images'
                }]
            }
        }
      , htmlmin:{
            dist1:{
                options:{}
              , files:[{
                    expand:true
                  , cwd:'app'
                  , src:'{,*/}*.html'
                  , dest:'dist'
                }]
            }
          , dist2:{
                options:{
                    collapseBooleanAttributes:true
                  , collapseWhitespace:true
                  , removeAttributeQuotes:true
                  , removeCommentsFromCDATA:true
                  , removeEmptyAttributes:true
                  , removeOptionalTags:true
                  , removeRedundantAttributes:true
                  , useShortDoctype:true
                }
              , files:[{
                    expand:true
                  , cwd:'dist'
                  , src:'{,*/}*.html'
                  , dest:'dist'
                }]
            }
        }
      , cssmin:{
            dist:{
                files:{
                    'dist/styles/main.css':[
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        }
      , copy:{
            dist:{
                expand:true
              , flatten:true
              , src:'bower_components/font-awesome/fonts/*'
              , dest:'dist/fonts/'
            }
        }
      , rev:{
            dist:{
                files:{
                    src:[
                        'dist/scripts/{,*/}*.js'
                      , 'dist/styles/{,*/}*.css'
                      , 'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                      , 'dist/styles/fonts/*'
                    ]
                }
            }
        }
      , usemin:{
            html:['dist/{,*/}*.html']
          , css:['dist/styles/{,*/}*.css']
          , options:{
                dirs:['dist']
            }
        }
    });

    grunt.registerTask('serve',[
        'clean:server'
      , 'replace:app'
      , 'concurrent:server'
      , 'neuter:app'
      , 'connect:livereload'
      , 'watch'
    ]);

    grunt.registerTask('build',[
        'clean:dist'
      , 'replace:dist'
      , 'useminPrepare'
      , 'concurrent:dist'
      , 'neuter:app'
      , 'concat'
      , 'uglify'
      , 'copy'
      , 'rev'
      , 'usemin'
      , 'htmlmin:dist2'
    ]);
};

