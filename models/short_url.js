module.exports = function(sequelize, DataTypes) {
  var ShortUrl = sequelize.define('ShortUrl', {
    url: {
      type: DataTypes.STRING(32)
    },
    hits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return ShortUrl;
}
