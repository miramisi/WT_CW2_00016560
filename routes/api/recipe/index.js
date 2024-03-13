const express = require('express');
const { validationResult } = require('express-validator');
const { addRecipeValidation, updateRecipeValidation, deleteRecipeValidation } = require('../../../validators/recipe');

const router = express.Router();
const recipe_controller = require('../../../controllers/api/recipe');

// Define API routes
router.get('/', (req, res)=>{
    recipe_controller.getAll(req, res);
});

router.post('/', addRecipeValidation(), (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



    recipe_controller.create(req, res)
})

router.put('/:id', updateRecipeValidation(), (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  recipe_controller.update(req, res)
})

router.delete('/:id', deleteRecipeValidation(), (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  recipe_controller.delete(req, res)
})

module.exports = router;