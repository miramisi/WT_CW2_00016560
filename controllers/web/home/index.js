const recipe_service = require('../../../services/recipe')

const home_controller = {
    index: async (req, res) =>{
        res.render('home');
    },
    add: async (req, res) =>{
        res.render('home/add_update', { mode: 'Add' });
    },
    update: async (req, res) =>{
        const recipeData = await recipe_service.getById(req.params.id);
        res.render('home/add_update', { mode: 'Update', recipeData: recipeData });
    }
};
  
module.exports = home_controller;
