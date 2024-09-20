const { Sequelize } = require('sequelize');
const ForwarderUserModel = require('../models/userModel')
const PostingModel = require('../models/postingModel')
const RoleModel = require('../models/roleModel')

const sequelize = new Sequelize('bourse_de_fret', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});


const User = ForwarderUserModel(sequelize)
const Posting = PostingModel(sequelize)
const Role = RoleModel(sequelize)



Role.hasMany(User, {
    foreignKey: {
        defaultValue: 2,
    },
});
User.belongsTo(Role);

User.hasMany(Posting, {
    foreignKey: {
        allowNull: false,
    }
})
Posting.belongsTo(User)


sequelize.sync({ force: false })
  .then(async () => {
    await Role.findOrCreate({
      where: { label: 'admin' }, 
      defaults: { label: 'admin' } 
    });

    await Role.findOrCreate({
      where: { label: 'user' }, 
      defaults: { label: 'user' } 
    });
  })
  .then(() => {
    console.log('Rôles créés ou déjà existants');
  })
  .catch((error) => {
    console.error('Erreur lors de la création des rôles :', error);
  });

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = {sequelize, User, Posting, Role}

