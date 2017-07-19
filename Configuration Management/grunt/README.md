# grunt

Grunt, "The JavaScript Task Runner," runs tasks. If you’ve ever used Make or Rake, Grunt will seem familiar. These tasks include compiling CoffeeScript or LESS or SASS, concatenating JavaScript and CSS, running tests, and plenty more. Depending on the projects needs, a specific set of Grunt plugins will be installed. 

The following Gruntfile.js includes tasks for compiling LESS, compiling Node modules for the browser (with Browserify), minifying code with Uglify and binding files and tasks to a watch-mode.

Before initializing the application run the script *npm run grunt* -- verify that resulting files are added to /tmp/build.

```javascript
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
```

### PACKAGES USED

* **grunt-contrib-less**: Compile LESS files to CSS
* **grunt-browserify**: Grunt task for node-browserify.
* **grunt-contrib-uglify**: Minify JavaScript files with UglifyJS
* **grunt-contrib-watch**: Run predefined tasks whenever watched file patterns are added, changed or deleted
