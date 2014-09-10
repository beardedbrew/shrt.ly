var fs        = require('fs')
  , _         = require('lodash')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , db = {}

// Setup database connection
var sequelize = new Sequelize('shrtly', 'shrtly_user', '#sh1rtl3ss!', {
  port: 3306,
  host: '192.168.61.101'
})

// Load models
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
