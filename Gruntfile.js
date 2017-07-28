//const path = require('path');

module.exports = function(grunt)
{
    grunt.registerTask('default', 'sass',
    function()
    {
        grunt.log.writeln('start');
        //run async tasks
        let done = this.async();
        for(let x of scssMinTask(done))
        {
            grunt.log.writeln(JSON.stringify(x));
        }
    });

};
function* scssMinTask(done)
{
    const globby = require('globby');
    const concat = require('concat');
    const sass = require('node-sass');
    const CleanCSS = require('clean-css');
    const fs = require('fs');
    let concated,complied,output,inputPaths;

    yield inputPaths = globby(['./scr/sass/*'])
    .then((paths)=>{return paths})
    .catch((err)=>
    {
        obj = {error:err,subtask:'globby'};
        return obj;
    });
    yield concated = concat(inputPaths)
    .then((result)=>{return result;})
    .catch((err) =>
    {
        obj = {error:err,subtask:'concat sass'};
        return obj;
    });

    yield complied = sass.renderSync({data: concated});
    yield output = new CleanCSS({}).minify(complied.css);

    fs.writeFile('./public/stylesheets/style.css', ouput.styles,
    function (err)
    {
        if (err)
        {
            obj = {error:err,subtask:'fs'};
            return obj;
        };
        done();
    });

}