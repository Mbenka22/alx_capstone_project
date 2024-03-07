const searchMeal = async (e) => {
    e.preventDefault();

    const input = document.querySelector('.input');
    const title = document.querySelector('.food-title');
    const info = document.querySelector('.food-description');
    const image = document.querySelector('.image');
    const ingredientsOutput = document.querySelector('.ingredients');

    const showMealInfo = (meal) => {
        const { strMeal, strMealThumb, strInstructions } = meal;
        title.textContent = strMeal;
        image.style.backgroundImage = `url(${strMealThumb})`;
        info.textContent = strInstructions;

        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            } else {
                break;
            }
        }

        const html = ingredients.map((ing) => `<li>${ing}</li>`).join("");
        ingredientsOutput.innerHTML = `<ul>${html}</ul>`;
    };

    const displayAlert = () => {
        alert('No such food');
    };

    const fetchMealData = async (value) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
        const responseData = await res.json();
        const { meals } = responseData;
        return meals;
    };

    const value = input.value.trim();

    if (value) {
        const meals = await fetchMealData(value);

        if (!meals) {
            displayAlert();
            return;
        }

        meals.forEach(showMealInfo);
    } else {
        alert("Please enter a different meal");
    }
};

const form = document.querySelector('.input-container');
form.addEventListener("submit", searchMeal);

const magnifier = document.querySelector('.fa-magnifying-glass');
magnifier.addEventListener("click", searchMeal);
