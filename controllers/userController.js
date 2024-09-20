const { User } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {secret_key} = require('../configs/privatekey')


//-----------ROUTE ('/')

const getUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        res.json({ message: 'Liste des users', data : result })
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`, data : error})
    }
}

const postUser = async (req, res) => {
    try {
        const result = await User.findOne({
            where: {
                email : req.body.email
            }
        })
        if(result){
            return res.status(400).json({message : `l'email est déjà utilisé`})
        }
        if(req.body.password.length < 6 ){
            return res.status(400).json({message : `Le mot de passe doit contenir au moins 6 caractères`})

        }
        const hashPassword =  await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        const newUser = await User.create(req.body)
        
        const token = jwt.sign({ userId: newUser.id}, secret_key, {expiresIn: '1d'}) ;
        res.status(201)
        .cookie("access_token", token).json({message : "Un user a bien été ajouté", data : newUser})
         
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`, data : error})
    }
}

//-----------ROUTE ('/:id')


const getUserById = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id)
        if(!result){
            return res.status(404).json({message : `le user n'existe pas`, data : result})
        }
        res.json({ message: ` ${result.email}`, data : result })
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`})
    }
}

const updateUser = async (req, res) => {
    try {

        if(req.body.password){
            const hashPassword =  await bcrypt.hash(req.body.password, 10)
            req.body.password = hashPassword
        }
        const result = await User.findByPk(req.params.id)       
        if(!result){

            return res.status(404).json({message : `le user n'exite pas`})
        }
        await result.update(req.body)
        res.json({ message: 'Les données ont bien été modifiées', data: result })
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`})
    }
}


module.exports = {getUsers, postUser, getUserById, updateUser}