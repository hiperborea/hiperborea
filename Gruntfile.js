'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean:{
            server:'.tmp'
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
                    src: 'app/index.html'
                  , dest: '.tmp/index.html'
                }]
            }
        }
      , concurrent:{
            server:[
                'emberTemplates'
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
          , livereload:{
                options:{
                    livereload:'<%= connect.options.livereload %>'
                }
              , files:[
                    '.tmp/scripts/*.js'
                  , '.tmp/styles/{,*/}.css'
                  , 'app/*.html'
                  , 'app/styles/{,*/}.css'
                ]
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
};

