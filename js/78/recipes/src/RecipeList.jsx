export default function RecipeList({recipes, selectedRecipe, onSelectedRecipe}) {
  return (
    <>
        <select id="recipes" value={selectedRecipe} onChange={e => onSelectedRecipe(e.target.value)}>
            <option hidden>select a recipe</option>
              {recipes?.map((r, index) => 
            <option key={r.id /*index*/} value={index}>{r.name}</option>)}
          </select>
    </>
  )
}
