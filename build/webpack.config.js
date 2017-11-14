const path = require('path');

module.exports = {
    entry: path.resolve(__dirname,'./javascripts/main.js'),
    output: {
        path: path.resolve(__dirname,'../public/javascripts/'),
        filename: 'bundle.js'
    }
};