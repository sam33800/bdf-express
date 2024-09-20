const { Posting, User } = require('../db/sequelizeSetup')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../configs/privatekey')


//------------------ROUTE('/')

const getPostings = async (req, res) => {

    try {
        const result = await Posting.findAll()
        res.json({ message: 'Liste des posts', data : result })
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`, data : error})
    }
}
const getMyPostings = async (req, res) => {
    const token = req.cookies.access_token

    try {
        const decoded = jwt.verify(token, secret_key);      
        req.userId = decoded.userId
        const userId = req.userId

        
        const result = await Posting.findAll(
            {
                where : {
                    UserId : userId
            }
            }
        )
        res.json({ message: 'Liste des posts', data : result })
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`, data : error})
    }
}

const createPosting = async (req, res) => {
    try {
        req.body.UserId = req.userId
        const newPosting = await Posting.create(req.body)

        res.status(201).json({ message: `Un post a bien été ajouté`, data: newPosting })
    } catch (error) {
        checkErrors(error, res)
    }
}
function checkErrors(error, res){
    if (error.errors?.length) {
            
        let messages = []
        for (let validationError of error.errors) {
            messages.push(validationError.message)
        }
        res.status(400).json({messages: messages})

    } else {
        res.status(500).json({message : `Une erreur est survenue`, data : error})
    }

}

//------------------ROUTE('/:id')

const findPostingByPk = async (req, res) => {
    try {
        const result = await Posting.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'annonce n'existe pas` })
        }
        res.json({ message: 'Annonce trouvé', data: result })
    } catch (error) {
        res.status(500).json({message : `Une erreur est surenue`})
    }
}


const updatePosting = async (req, res) => {
       
    try {
        const result = await Posting.findByPk(req.params.id)       
        if(!result){
            return res.status(404).json({message : `le post n'exite pas`})
        }
        await result.update(req.body)
        res.json({ message: 'Le post a bien été bien été modifié', data: result })
    } catch (error) {
        checkErrors(error, res)
    }
}

const deletePosting = async (req, res) => {
    try {
        const result = await Posting.findByPk(req.params.id)
        if(!result){
            return res.status(404).json({message : `le post n'existe pas`})
    
        }
        res.json({message : `le post' a bien été supprimée`, data : result})
        result.destroy()
    } catch (error) {
        res.status(500).json({message : `Erreur`})
    }
}


module.exports = {getPostings, createPosting, updatePosting, deletePosting, getMyPostings, findPostingByPk} 
