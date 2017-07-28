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
        globby(['./scr/sass/*'])
        .then((paths)=>
        {
            concat(paths).then((result)=>
            {
                let complied = sass.renderSync({data: result,});
            });
        })
        .catch((err)=>
        {
            grunt.log.writeln(err);
            done();
        });


    });

};
