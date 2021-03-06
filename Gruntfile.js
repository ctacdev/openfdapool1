module.exports = function(grunt) {

  "use strict";

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-aws');

  grunt.initConfig({
    /* Read aws credentials from a config file.
     * In order to be able to deploy, you will need to contact the SA staff
     * to get the accessKeyId and secretAccessKey from them and then add them
     * to the credentials.json file with the appropriate json key.
     */
    aws: grunt.file.readJSON("credentials.json"),
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "openfdapool1.ctacdev.com"
      },
      /* Push all files in the dist/ folder to s3 */
      build: {
        cwd: "dist/",
        src: "**"
      }
    },
    qunit: {
      all: ["test/**/*.html"]
    },
    clean: {
      build: {
        src: ["dist"]
      }
    },
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
          style: "compressed",
          loadPath: "node_modules/bootstrap-sass/assets/stylesheets"
        },
        files: [
          {
            expand: true,
            cwd: "src/scss",
            src: ["*.scss"],
            dest: "dist/css",
            ext: ".css"
          }
        ]
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
          "dist/js/ingredientBrowser.min.js": [
            "src/js/lib/*.js",
            "src/js/ingredientBrowser.js",
            "src/js/fda_labels.js",
            "src/js/fda-d3-charts.js"
          ],
          "ga.min.js": "src/js/ga.js"
        }
      },
      test: {
        files: {
          "test/test.js": [
            "src/js/lib/handlebars-v3.0.3.js",
            "src/js/fda_labels.js",
            "test/fda_helpers.js"
          ]
        }
      }
    },
    /* Setup a server to view the results locally */
    connect: {
      server: {
        options: {
          open: true,
          base: "dist/"
        }
      }
    },
    /* Watch for changed files and rebuild project */
    watch: {
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify:js"]
      },
      scss: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass:dev"]
      },
      images: {
        files: ["src/images/**/*"],
        tasks: ["copy:images"]
      },
      html: {
        files: ["src/templates/**/*"],
        tasks: ["copy:html"]
      }
    }
  });

  grunt.registerTask("deploy", ["clean", "copy", "sass", "uglify:js", "s3"])
  grunt.registerTask('build', ['clean', 'copy', 'sass:dev', 'uglify:js', 'connect:server', 'watch']);
  grunt.registerTask('default', 'build');
  grunt.registerTask('test', ['uglify:test', 'qunit'])
};
