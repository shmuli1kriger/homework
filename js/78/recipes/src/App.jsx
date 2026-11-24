import './App.css';
import Header from './Header';
import NoRecipe from './NoRecipe';
import Recipe from './Recipe';
import { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    (async ()=> {
      try { 
          const response = await fetch('recipes.json');
          if (!response.ok) {
              throw new Error(`${response.status} - ${response.statusText}`);
          }
          const result = await response.json();
          console.log(result);
          setRecipes(result);
      } catch(e) {
          console.error('oops', e);
      } 
    })();
  }, []);

  return (
    <>
      <Header/>
      <RecipeList recipes={recipes} selectedRecipe={selectedRecipe} onSelectedRecipe={setSelectedRecipe}/>
      <NoRecipe/>
      <Recipe recipe={recipes[selectedRecipe] ?? {}}/>
      <button onClick={() => setShowAdd(true)}>Add Recipe</button>
      {showAdd && <AddRecipe oldRecipeList={recipes} setRecipes={setRecipes} setShowAdd={setShowAdd}/>}
    </>
  )
}

