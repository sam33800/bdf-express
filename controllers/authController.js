const { where } = require("sequelize")
const { User } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../configs/privatekey')

const login = async (req, res) => {

    try {
        const result = await User.scope("withPassword").findOne({
            where: {
                email : req.body.email
            }
        })
        if(!result){

            return res.status(404).json({message : `l'email est incorrect`})
        }
        const correctPassword = await bcrypt.compare(req.body.password, result.password)
        if(!correctPassword){
           return res.status(400).json({message:"mot de passe incorrect"})
        }
            const token = jwt.sign({ userId: result.id}, secret_key, {expiresIn: '1d'}) ;
            res.cookie("access_token", token).json({message : "login reussi", data : result})     
    } catch (error) {
        res.json({message : "erreur", data : error})
        console.log(error);
        
    } 
}

const logout = async (req, res) =>{


    res.clearCookie('access_token');
    res.json({message : 'Vous êtes déconnecté'})
}

module.exports = {login, logout}