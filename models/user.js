const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


module.exports = (sequelize, DataTypes) => {
    class User extends Model {

      static associate(models){
        this.hasMany(models.NFT, {
          as: "nfts",
          foreignKey: "address"
        })
      }
    }

User.init({
  // Model attributes are defined here
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  twitter: {
    type: DataTypes.STRING,
  },
  facebook: {
    type: DataTypes.STRING,
  },
  portfolio: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING
  }



  
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

return User;
}


