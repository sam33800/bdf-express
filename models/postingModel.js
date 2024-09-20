const { type } = require('os');
const { DataTypes, INTEGER } = require('sequelize');
const { isDate } = require('util/types');

module.exports = (sequelize) => {
    return sequelize.define(
        'Posting',
        {
            // Model attributes are defined here
            goodsType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1,100],
                        msg: 'Le champs doit contenir moins de 100 caractères'
                    }
                }
            },
            length: {
                type: DataTypes.INTEGER,
                validate: {
                    max: {
                        args: 100,
                        msg : "La longueur ne peut pas dépasser 100m"
                    },
                    min: {
                        args: 1,
                        msg: 'La longueur ne peut pas être négative'
                    }
                }
            },
            width: {
                type: DataTypes.INTEGER,
                validate: {
                    max: {
                        args: 100,
                        msg : 'La largeur ne peut pas dépasser 100m'
                    },
                    min: {
                        args: 1,
                        msg: 'La largeur ne peut pas être négative'
                    }
                }

            },
            heigth: {
                type: DataTypes.INTEGER,
                validate: {
                    max: {
                        args: 100,
                        msg : "La hauteur ne peut pas dépasser 100m"
                    },
                    min: {
                        args: 1,
                        msg: 'La hauteur ne peut pas être négative'
                    }
                }
            },
            pickUpDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            deliveryDate: {
                type: DataTypes.DATEONLY,
            },
            pickUpCity: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1,105],
                        msg: 'La valeur du champ "Ville de chargement" doit être comprise entre 1 et 105 caractères'
                    },
                    is: { 
                        args: /^[a-zA-Z-]+$/,
                        msg: "Le nom de la ville de chargement incorrect"
                    }
                }
            },
            deliveryCity: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1,105],
                        msg: 'La valeur du champ "Ville de livraison" doit être comprise entre 1 et 105 caractères'
                    },
                    is: { 
                        args: /^[a-zA-Z-]+$/,
                        msg: "le nom de la ville de livraison incorrect"
                    }
                }
            },
            addInfo: {
                type: DataTypes.TEXT,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        },
        {
        },
    );
}