module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      PhoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [9,11]
        }
      },
      Location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [5]
        }
      },
      Consent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    });

    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Sensor, {
        onDelete: "cascade"
      });
    };

    return User;
  };