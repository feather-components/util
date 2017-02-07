module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                options: {
                    separator: '\n',
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
}\n\
"
                },

                files: {
                    '<%=pkg.name%>.js': [
                        'lib/string.js',
                        'lib/date.js',
                        'lib/number.js',
                        'lib/object.js',
                        'lib/qs.js'
                    ]
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                sourceMapName: '<%=pkg.name%>-min.js.map'
            },
            build: {
                src: '<%=pkg.name%>.js',
                dest: '<%=pkg.name%>-min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'uglify']);
};