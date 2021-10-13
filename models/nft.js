'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models){
      this.belongsTo(models.User, {foreignKey: "address"});
    }
  };
  NFT.init({
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
  },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
  }
  }, {
    sequelize,
    modelName: 'NFT',
    tableName: 'nfts',
    timestamps: false,
  });
  return NFT;
};