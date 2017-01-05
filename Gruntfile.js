module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**',
                        dest: 'dist'
                    }
                ]
            }
        },

        concat: {
            js: {
                options: {
                    separator: ';',
                    process: function(content){
                        return content.replace(/if\s*\(\s*typeof\s+(?:define|module|exports)[\s\S]+?\}\s*else\s*\{([\s\S]*?)\}\s*(?=\}(?:\)|\()|$)/, function(all, $1){
                            return '\t' + $1.trim() + '\n';
                        });
                    },
                    footer: ";\n\
if(typeof define == 'function' && define.amd){\n\
    define([], this.util);\n\
}else if(typeof module === 'object' && typeof module.exports == 'object'){\n\
    module.exports = this.util;\n\
}"
                },

                files: {
                    'dist/<%=pkg.name%>.js': [
                        'src/string.js',
                        'src/date.js',
                        'src/number.js',
                        'src/object.js',
                        'src/qs.js'
                    ]
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                sourceMapName: 'dist/<%=pkg.name%>-min.js.map'
            },
            build: {
                src: 'dist/<%=pkg.name%>.js',
                dest: 'dist/<%=pkg.name%>-min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['copy', 'concat'/*, 'uglify', 'cssmin'*/]);
};