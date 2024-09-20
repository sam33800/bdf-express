const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            // Model attributes are defined here
            
            email: {
                type: DataTypes.STRING,
                allowNull : false,
                unique : {
                    msg : `l'email est déjà utilisé`
                },
                validate : {
                    isEmail : {
                        args : true,
                        msg : `Le format d'email n'est pas valide`
                    }

                }
            },
            password: {
                type: DataTypes.STRING,
            },
            // validation de mail
            
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull : false,
                validate : {
                    isNumeric : {
                        msg : 'Le numéro de téléphone doit contenir seulement des chiffres'
                    },
                    len:{
                        msg : 'Le numéro doit contenir 10 chiffres',
                        args:[10]

                    }
                }
            }
            
            
        },
        {
            // Other model options go here
            defaultScope: {
                attributes: { exclude: ['password'] },
              },
            scopes: {
                withPassword: {
                  attributes: {}
                },
              },
              hooks: {
                afterCreate: (record) => {
                    delete record.dataValues.password;
                },
                afterUpdate: (record) => {
                    delete record.dataValues.password;
                },
            }
          
        },
        
    );
}