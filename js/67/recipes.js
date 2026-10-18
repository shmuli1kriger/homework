const categorydropdown = document.querySelector('#categoryDropdown');
categorydropdown.innerHTML += `<option value="">Please choose a category</option>`;
const recipedropdown = document.querySelector('#recipeDropdown');
const recipeName = document.querySelector('#name');
const ingredientList = document.querySelector('#ingredientList');
const ingredientHeader = document.querySelector('#ingredientHeader');
const image = document.querySelector('#image');
const directionsHeader = document.querySelector('#directionsHeader');
const directions = document.querySelector('#directions');
let recipesInfo;
try{
    const response = await fetch('recipes.json');
    if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
    }
    recipesInfo = await response.json();
    const categoryArray = [];
    recipesInfo.forEach(recipe => {
        if (!categoryArray.includes(recipe.category)) {
            categoryArray.push(recipe.category);
        }
    });
    categoryArray.forEach(item => {
                categorydropdown.innerHTML += `<option value="${item}">${item}</option>`;
            });
} catch(e) {
    console.error(e);
}
categorydropdown.addEventListener('change', async e => {
    const category = e.target.value;
    recipedropdown.style.display = 'inline-block';
    recipedropdown.innerHTML = `<option value="">Please choose a recipe</option>`;
    recipesInfo.forEach(recipe => {
        if (recipe.category === category) {
            recipedropdown.innerHTML += `<option value="${recipe.id}">${recipe.name}</option>`;
        }
    });
});
recipedropdown.addEventListener('change', async e => {
    const selectedRecipeId = e.target.value;
    if (!selectedRecipeId) {
        return;
    }
    try{
        const response = await fetch(`recipe-${selectedRecipeId}.json`);
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const recipeDetails = await response.json();
        recipeName.innerText = recipeDetails.name;
        image.src = recipeDetails.pictureUrl;
        ingredientHeader.style.display = 'block';
        ingredientList.innerHTML = '';
        recipeDetails.ingredients.forEach(ingredient => {
            ingredientList.innerHTML += `<li>${ingredient}</li>`;
        });
        directionsHeader.style.display = 'block';
        directions.innerHTML = '';
        directions.innerText = recipeDetails.directions;
    } catch(e) {
        console.error(e);
    }
});