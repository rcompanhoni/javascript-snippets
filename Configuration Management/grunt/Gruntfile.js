module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            main: {
                options: {
                    paths: ["my_css"]
                },
                files: {
                    "tmp/build/main.css": "my_css/main.less"
                }
            }
        },
        browserify: {
            client: {
                src: ["my_javascripts/main.js"],
                dest: "tmp/build/main.js",
            }
        },
        uglify: {
            myApp: {
                files: {
                    "tmp/build/main.min.js": ["tmp/build/main.js"]
                }
            }
        },
        watch: {
            scripts: {
                files: ["my_javascripts/*.js"],
                tasks: ["browserify"]
            },
            styles: {
                files: ["my_css/*.less"],
                tasks: ["less"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["browserify", "less", "uglify"]);
};