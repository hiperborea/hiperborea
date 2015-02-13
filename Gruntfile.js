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
                    '.tmp/index.html':'web/jade/dev.jade'
                }
            }
          , dist:{
                options:{
                    pretty:false
                }
              , files:{
                    '.tmp/index.html':'web/jade/prod.jade'
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
      , symlink:{
            options:{
                overwrite:false
            }
          , explicit:{
                src:'bower_components'
              , dest:'.tmp/vendor'
            }
        }
      , concat:{
            options:{
                separator:';'
            }
          , dist:{
                src:[
                    '.tmp/vendor/skrollr/dist/skrollr.min.js'
                  , '.tmp/vendor/skrollr-menu/dist/skrollr.menu.min.js'
                  , 'public/js/app.js'
                ]
              , dest:'.tmp/script.js'
            }
        }
      , uglify:{
            dist:{
                files:{
                    'dist/script.js':['.tmp/script.js']
                }
            }
        }
      , cssmin:{
            dist:{
                files:{
                    'dist/style.css':['.tmp/style.css']
                }
            }
        }
      , htmlmin:{
            dist:{
                options:{
                    collapseBooleanAttributes:true
                  , collapseWhitespace:true
                  , removeAttributeQuotes:true
                  , removeComments:true
                }
              , files:{
                    'dist/index.html':'.tmp/index.html'
                }
            }
        }
    });

    grunt.registerTask('serve',[
        'clean:devel'
      , 'concurrent:devel'
      , 'connect:livereload'
      , 'watch'
    ]);

    grunt.registerTask('build',[
        'clean'
      , 'concurrent:dist'
      , 'symlink'
      , 'concat'
      , 'uglify'
      , 'cssmin'
      , 'htmlmin'
    ]);
};

