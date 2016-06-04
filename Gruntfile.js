/* global module: false */
module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      files: ['Gruntfile.js', 'src/**/*.js']
    },

    uglify: {
      build: {
        src: 'src/**/*.js',
        dest: 'build/pen-<%= pkg.version %>.min.js'
      }
    },

    copy: {
      css: {
        files: [
          {
            cwd: "src",
            src: ["font/**/*", "pen.css"],
            dest: "build/css/",
            expand: true
          }
        ]
      },
      dist: {
        files: [
          {
            cwd: "build",
            src: ["css/**/*", "*.min.js"],
            dest: "dist/",
            expand: true
          }
        ]
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'copy:css']);
  grunt.registerTask('release', ['copy:dist']);

};
