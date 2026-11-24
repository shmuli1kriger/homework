import { useState } from "react"

export default function AddRecipe({oldRecipeList, setRecipes, setShowAdd}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [ingredients, setIngredients] = useState("");

    function add(e) {
        e.preventDefault();
        setShowAdd(false);
        console.log(name, image, ingredients);

        const newRecipe = {
            id: Math.max(0, ...oldRecipeList.map(r => r.id)) + 1,
            name: name,
            ingredients: ingredients.split(",").map(item => item.trim()),
            picture: image
        };
        const newRecipeList = [...oldRecipeList, newRecipe]
        setRecipes(newRecipeList);
    }

  return (
    <form onSubmit={add}>
      Name: <input type="text" value={name} onChange={e => setName(e.target.value)}/>

      Image URL: <input type="text" value={image} onChange={e => setImage(e.target.value)}/>
      Ingredients:<input type="text" value={ingredients} onChange={e => setIngredients(e.target.value)}/>
      <button type="submit">submit</button>
    </form>
  )
}

