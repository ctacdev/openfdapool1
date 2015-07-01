module.exports = function(grunt) {

  "use strict";

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.initConfig({
    // Put files not handled in other tasks here
    copy: {
      images: {
        files: [
          {
            expand: true,
            src: ["src/images/**/*"],
            dest: "dist/images",
            flatten: true
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: "src/templates",
            src: ["**/*.html"],
            dest: "dist"
          }
        ]
      }
    },
    /* Compile sass files */
    sass: {
      dev: {
        options: {
          style: "compressed"
        },
        files: {
          "dist/css/app.min.css": [
            "src/scss/style.scss",
            "src/scss/d3-theme.scss"
          ]
        }
      }
    },
    /* Uglify our javascript */
    uglify: {
      js: {
        options: {
          compress: true,
          mangle: true,
          preserveComments: false
        },
        files: {
          "dist/js/app.min.js": ["src/js/**/*.js"]
        }
      }
    },
    /* Setup a server to view the results locally */
    connect: {
      server: {
        options: {
          open: true,
          keepalive: true,
          base: "dist/"
        }
      }
    }
  });

  grunt.registerTask('build', ['copy', 'sass:dev', 'uglify:js', 'connect:server']);
};
