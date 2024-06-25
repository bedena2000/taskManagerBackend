
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/Auth.js');
const Board = require('../../schemas/Board');
const {all} = require("express/lib/application");

router.get('/all', async (req, res) => {
    
    const userId = req.userId;
    
    if(userId) {    
        
        const result = await Board.findAll({
            where: {
                user_id: userId
            }
        });
        
        if(!result) {
            return res.status(403).send({
                message: 'nothing has been found'
            });
        }
        
        return res.status(200).send({
            data: result
        });
        
        
    } else {
        return res.status(403).send({
            message: 'Authentication Error'
        });
    }
    
    
});

module.exports = router;