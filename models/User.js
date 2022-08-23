const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

// creat our User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        // define an id column
        id: {
            // use the specail Sequelize DataTypes object to provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivilent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turb on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // defin an email cloumn
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our impoerted sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createAt/updateAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instea of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // mak it so our model name statys lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;