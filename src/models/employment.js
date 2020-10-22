module.exports = (sequelize,DataTypes) => {
  return sequelize.define('employment', {
    id: {
      type: DataTypes.INTEGER,
      //allowNull:false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      //allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    timestamps: false,
  });
};
