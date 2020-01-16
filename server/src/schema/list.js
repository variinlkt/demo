export default function list(sequelize, DataTypes) {
  return sequelize.define('list', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    song: {
      type: DataTypes.STRING(20),
    },
    singer: {
      type: DataTypes.STRING(20),
    },
    img: {
      type: DataTypes.STRING(100),
    },
    file: {
      type: DataTypes.STRING(100),
    },
    lrc: {
      type: DataTypes.STRING(100),
    },
  }, {
    timestamps: false,
    tableName: 'list'
  });
}