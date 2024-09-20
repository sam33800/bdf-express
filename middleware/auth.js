const jwt = require('jsonwebtoken');
const { secret_key } = require('../configs/privatekey');
const { User, Role } = require('../db/sequelizeSetup');


const protect = async (req, res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json({message : `vous n'etes pas authentifié`})
    }
    try {
        const decoded = jwt.verify(token, secret_key);      
        req.userId = decoded.userId
        const result = await User.findByPk(decoded.userId, {include : Role})
        if(!result){
            return res.status(401).json({message : "L'utilisateur n'existe pas"})            
        }
        req.user = result
        next()
    } catch (error) {
        res.status(401).json({message : `jeton non valide`})
    }
}


const restrictToOwnUser = (model) => {

    return async (req, res, next) => {

        try {
    
            const result = await model.findByPk(req.params.id)
            if (!result) return res.status(404).json({ message: 'ressource non trouvée' })


            if (result.UserId != req.user.id) {
                return res.status(403).json({ message: 'Non autorisé' })
            }
            next()
        } catch (error) {
            res.status(401).json({message : `erreur`})
        }



    }
}

module.exports = { protect,  restrictToOwnUser }