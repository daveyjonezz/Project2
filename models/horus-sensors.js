module.exports = function(sequelize, DataTypes) {
    var Sensor = sequelize.define("Sensor", {
      SensorType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Sensor.associate = function(models) {
      // We're saying that a Sensor should belong to an Author
      // A Sensor can't be created without an Author due to the foreign key constraint
      Sensor.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Sensor;
  };
  