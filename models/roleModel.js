const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Role',
        {
            label: {
                type: DataTypes.STRING,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
        },
    );
}