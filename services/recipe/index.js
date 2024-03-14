const fs = require('fs')

const recipes = require(global.mock_db)

const recipe_service = {
    getAll() {
        return recipes
    },
	getById(id) {
        return recipes.find(t => t.id == id)
    },    
    create(req, res) {
        let new_id = genRandId(4)
                
        const recipe = req.body

        const new_recipe = {
            id: new_id,
            recipe: recipe
        }

        recipes.push(new_recipe)
        
        writeToFile(recipes)
        
        return new_recipe
    },
    update(id, updateData){
        const recipeIndex = recipes.findIndex(t => t.id == id)

        if (recipeIndex === -1) {
            return null
        }

        recipes[recipeIndex].recipe = { ...recipes[recipeIndex].recipe, ...updateData }

        writeToFile(recipes)

        return recipes[recipeIndex]
    },
    delete(id) {
        const index = recipes.findIndex(u => u.id == id)
        recipes.splice(index, 1)    
        writeToFile(recipes)
    }
}

let writeToFile = async (users) => {
    await 
        fs.writeFileSync(
            global.mock_db,
            JSON.stringify(
                users, null, 4
            ),
            'utf8'
        )
}

// generate random id inspired by uuid
let genRandId = (count) =>{
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = recipe_service