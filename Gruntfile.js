//const path = require('path');

module.exports = function(grunt)
{
    grunt.registerTask('default', 'sass',
    function()
    {
        grunt.log.writeln('start');
        //run async tasks
        let done = this.async();
        const globby = require('globby');
        const concat = require('concat');
        const sass = require('node-sass');
        const CleanCSS = require('clean-css');
        const fs = require('fs');
        globby(['./scr/sass/*'])
        .then((paths)=>
        {
            concat(paths).then((result)=>
            {
                let complied = sass.renderSync({data: result});
                let ouput = new CleanCSS({}).minify(complied.css)
                fs.writeFile('./public/stylesheets/style.css', ouput.styles,
                function (err)
                {
                    if (err) {grunt.log.writeln(err);done();};
                    done();
                });
            });
        })
        .catch((err)=>
        {
            grunt.log.writeln(err);
            done();
        });
    });

};
