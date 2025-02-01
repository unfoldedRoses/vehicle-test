const db = require('../models');


const userController = {
    getAllUsers: async (req, res) => {
        try {
             console.log("sdsds")
            const users = await db.User.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },

    createUser: async (req, res) => {
        try {
           
            const newUser = await db.User.create(req.body); // Directly create user from req.body
            res.status(201).json({ 
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
              
            }); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
};

module.exports = userController;