'use strict';

module.exports=function(grunt){
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean:{
            devel:'.tmp'
          , dist:'dist'
        }
      , concurrent:{
            devel:[
                'jade:devel'
              , 'less:devel'
            ]
          , dist:[
                'jade:dist'
              , 'less:dist'
              , 'symlink'
              , 'imagemin:dist'
              , 'svgmin:dist'
            ]
        }
      , jade:{
            devel:{
                options:{
                    pretty:true
                  , data:{
                        debug:true
                    }
                }
              , files:{
                    '.tmp/index.html':'web/jade/index.jade'
                }
            }
          , dist:{
                options:{
                    pretty:false
                }
              , files:{
                    '.tmp/index.html':'web/jade/index.jade'
                }
            }
        }
      , less:{
            devel:{
                options:{
                    dumpLineNumbers:'all'
                  , paths:['bower_components']
                }
              , files:{
                    '.tmp/style.css':'web/less/index.less'
                }
            }
          , dist:{
                options:{
                    cleancss:true
                  , paths:['bower_components']
                }
              , files:{
                    '.tmp/style.css':'web/less/index.less'
                }
            }
        }
      , connect:{
            options:{
                port:2999
              , livereload:35729
              , hostname:'localhost'
            }
          , livereload:{
                options:{
                    base:['.tmp']
                  , middleware:function(connect){
                        return [
                            connect.static('.tmp')
                          , connect.static('public')
                          , connect().use('/vendor',
                                connect.static('bower_components'))
                        ];
                    }
                }
            }
        }
      , watch:{
            jade:{
                files:['web/jade/*.jade']
              , tasks:['jade:devel']
            }
          , less:{
                files:['web/less/*.less']
              , tasks:['less:devel']
            }
          , livereload:{
                options:{
                    livereload:'<%= connect.options.livereload %>'
                }
              , files:[
                    '.tmp/index.html'
                  , '.tmp/style.css'
                ]
            }
        }
/*      , useminPrepare:{
            html:'.tmp/index.html',
            options:{
                dest:'dist'
            }
        }*/
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
                  , cwd:'public/images'
                  , src:'{,*+/}*.{png,jpg,jpeg}'
                  , dest:'dist/images'
                }]
            }
        }
      , svgmin:{
            dist:{
                files:[{
                    expand:true
                  , cwd:'public/images'
                  , src:'{,*+/}*.svg'
                  , dest:'dist/images'
                }]
            }
        }
      , htmlmin:{
            dist:{
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
                  , cwd:'.tmp'
                  , src:'*.html'
                  , dest:'dist'
                }]
            }
        }
/*      , rev:{
            dist:{
                files:{
                    src:[
                        'dist/scripts/{,*+/}*.js'
                      , 'dist/styles/{,*+/}*.css'
                      , 'dist/images/{,*+/}*.{png,jpg,jpeg,gif,webp}'
                      , 'dist/styles/fonts/*'
                    ]
                }
            }
        }
      , usemin:{
            html:['dist/{,*+/}*.html']
          , css:['dist/styles/{,*+/}*.css']
          , options:{
                dirs:['dist']
            }
        }*/
    });

    grunt.registerTask('serve',[
        'clean:devel'
      , 'concurrent:devel'
      , 'connect:livereload'
      , 'watch'
    ]);

    grunt.registerTask('build',[
        'clean'
/*      , 'useminPrepare'*/
      , 'concurrent:dist'
/*      , 'concat'
      , 'uglify'
      , 'copy'
      , 'rev'
      , 'usemin'
      , 'htmlmin'*/
    ]);
};

