module.exports = function(sequelize, DataTypes) {
  var ShortUrl = sequelize.define('ShortUrl', {
    url: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    classMethods: {

    }
  })
  return ShortUrl;
}