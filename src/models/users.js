module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull:false,
    }
  }, {
    timestamps: false,
  });
}
