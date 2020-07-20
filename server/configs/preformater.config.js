const path = require('path')
const app = require('../app')

module.exports = app => {

    app.use(require('node-sass-middleware')({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        sourceMap: true
    }))
}