module.exports = function(sequelize, DataTypes) {
  var ShortUrl = sequelize.define('ShortUrl', {
    url: DataTypes.STRING,
    hits: {type: DataTypes.INTEGER, defaultValue: 0}
  }, {
    classMethods: {

    }
  })
  return ShortUrl;
}