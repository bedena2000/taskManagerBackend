const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/Auth.js');
const Board = require('../../schemas/Board');

router.post('/create', async (req, res) => {
    
    const userId = req.userId;
    const { title } = req.body;
    
    if(userId) {
        
        if(title.length === 0) {
            return res.status(403).send({
                message: 'board name cannot be empty'
            })
        }
        
        const newBoard = new Board({
            title: title,
            user_id: userId
        });
        
        await newBoard.save();
        
        return res.status(200).send({
            message: 'new board has been created'
        });
        
        
    } else {
        return res.status(403).send({
            message: 'Authentication Error'
        });
    }
    
    
});

module.exports = router;