'use strict';

var Mocha = require('mocha');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      lib: {
        src: ['lib/**/*.js']
      },
      mocha: {
        src: ['test/**/*.js'],
        options: {
          expr: true,
          globals: {
            describe: false,
            it: false,
            before: false,
            after: false,
            beforeEach: false,
            afterEach: false
          }
        }
      },
      options: {
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: 'vars',
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {
          define: true
        }
      }
    },
    mocha: {
      src: ['test/**/*.js'],
      options: {
        reporter: 'dot',
        debug: true,
        verbose: true,
        run: true,
        stdio: 'inherit'
      }
    },
    watch: {
      jshint: {
        files: ['lib/**/*.js'],
        tasks: ['jshint']
      },
      mocha: {
        files: ['test/*.js'],
        tasks: ['mocha']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Basic mocha task that runs node-based unit tests
  grunt.registerMultiTask('mocha', 'Run unit tests with mocha', function() {
    var done = this.async();
    var mocha = new Mocha(this.options());
    this.filesSrc.forEach(function(file) {
      mocha.addFile(file);
    });
    try {
      mocha.run(function(failures) {
        done(failures === 0);
      });
    } catch (e) {
      done(false);
    }
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'mocha']);
};
