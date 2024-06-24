const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db/db");
const User = require('./User');

class Board extends Model {}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
    
  },
  {
    sequelize: db.sequelize,
    modelName: "board",
    tableName: 'board',
    timestamps: false,
  }
);

module.exports = Board;