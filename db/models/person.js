const Sequelize = require('sequelize'); //trazendo sequeliza do node para o meu proj.

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "firstName"',
                },
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for "firstName"',
                }
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "lastName"',
                },
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for "lastName"',
                }
            },
        },

    },
    {
        timestamps: false, // disable timestamps. isso removeu updateAt and createdAt and deleteAt
        sequelize
    });
    return Person;
};