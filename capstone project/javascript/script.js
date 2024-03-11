function login() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (username && email) {
        // Hide the login form
        document.getElementById('loginForm').style.display = 'none';

        // Show the search container and meal container
        document.getElementById('searchContainer').style.display = 'block';
        document.getElementById('mealContainer').style.display = 'block';

        // Call searchMeal() only after successful login
        searchMeal();
    } else {
        alert('Please enter both username and email.');
    }
}


const searchInput = document.getElementById('searchInput');
const mealContainer = document.getElementById('mealContainer');
const recipeContainer = document.getElementById('recipeContainer');

function searchMeal() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        alert('Please enter a meal name to search.');
        return;
    }

    // Fetch data from the API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Clear previous search results
            mealContainer.innerHTML = '';

            // Update UI with up to four meal options
            if (data.meals) {
                for (let i = 0; i < Math.min(data.meals.length, 4); i++) {
                    const meal = data.meals[i];
                    const mealDiv = document.createElement('div');
                    mealDiv.classList.add('meal');
                    mealDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="Meal Image">
                        <h2>${meal.strMeal}</h2>
                        <button onclick="showRecipe('${meal.idMeal}')">View Recipe</button>
                        <ul id="ingredientList${i}"></ul>
                    `;
                    mealContainer.appendChild(mealDiv);
                    fetchIngredients(meal.idMeal, i);
                }
            } else {
                alert('No meals found for the given keyword.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again later.');
        });
}

function fetchIngredients(mealId, index) {
    // Fetch ingredients for a meal
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const ingredientList = document.getElementById(`ingredientList${index}`);
            if (meal && ingredientList) {
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient) {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${ingredient} - ${measure}`;
                        ingredientList.appendChild(listItem);
                    } else {
                        break;
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error fetching ingredients:', error);
        });
}

function showRecipe(mealId) {
    // Fetch recipe details using meal ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            if (meal && meal.strInstructions) {
                recipeContainer.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strInstructions}</p>
                `;
                recipeContainer.style.display = 'block';
            } else {
                alert('Recipe not found for this meal.');
            }
        })
        .catch(error => {
            console.error('Error fetching recipe:', error);
            alert('An error occurred while fetching the recipe. Please try again later.');
        });
}
