module.exports = function (grunt) {
  'use strict';

  var path = require('path');
  var config = require('config');

  var pkg = grunt.file.readJSON('package.json');
  for (var taskName in pkg.devDependencies) {
    if (taskName.indexOf('grunt-') > -1) {
      grunt.loadNpmTasks(taskName);
    }
  }

  var buildPaths = config.get('buildPaths');
  var portConfig = config.get('portConfig');

  var styleBuildDest = {};
  styleBuildDest[buildPaths.buildLocation + 'app.css'] = 'src/sass/main.scss';

  var appBuildDest = buildPaths.buildLocation + 'bundle.js';

  // https://github.com/Swiftwork/project-hex

  grunt.initConfig({
    pkg: pkg,
    clean: {
      build: buildPaths.clean
    },
    copy: {
      build: {
        files: [
          { expand: true, cwd: 'lib/vendor/babylonjs/dist/', src: ['babylon.2.4.max.js'], dest: buildPaths.buildLocation },
          { expand: true, cwd: buildPaths.assetPath, src: ['**'], dest: buildPaths.buildLocation, filter: 'isFile' }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          sourcemap: 'none',
          style: 'expanded',
          trace: true,
          require: ['normalize-scss']
        },
        files: styleBuildDest
      }
    },
    webpack: {
      build: {
        entry: './src/app/index.ts',
        output: {
          filename: './build/bundle.js',
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: 'source-map',

        resolve: {
          root: path.resolve(process.cwd(), 'src/app'),
          extensions: ['', '.js', '.ts']
        },

        module: {
          loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.ts?$/, loader: 'ts-loader' }
          ],

          preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader' }
          ]
        }
      }
    },
    connect: {
      options: {
        hostname: '127.0.0.1'
      },
      build: {
        options: {
          port: portConfig.build,
          base: buildPaths.buildLocation,
          open: {
            target: 'http://127.0.0.1:<%= connect.build.options.port %>/index.html'
          }
        }
      }
    },
    watch: {
      styles: {
        files: [
          'src/sass/**/*.scss'
        ],
        tasks: ['sass:dev']
      },
      jsChanges: {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        tasks: ['webpack']
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'sass', 'webpack', 'connect', 'watch']);

  grunt.registerTask('styles', ['sass', 'watch:styles']);

  //// TODO
  grunt.registerTask('build', ['clean', 'copy', 'sass', 'webpack']);
}