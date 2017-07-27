//const path = require('path');

module.exports = function(grunt)
{
    grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
