const loadMeals = (searchText) => {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

    // console.log('loadmeals',url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => {
            console.log(error)
        })
}

const displayMeals = (meals) => {
    console.log(meals)
    const mealsContainer = document.getElementById('meals-container')
    mealsContainer.innerText = ''
    meals.forEach(meal => {
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('col')
        mealDiv.innerHTML = `
        <div class="card">
            <div class='p-2'>
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button  onclick="loadMealDetails2(${meal.idMeal})"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#meal-details">
             Meal Details
        </button>
            </div>
        </div>
        `
        mealsContainer.appendChild(mealDiv)
    });
}

function searchMeals() {
    const searchField = document.getElementById('search-field').value
    console.log(searchField, typeof searchField)
    loadMeals(searchField)
}

// const loadMealDetails = mealId =>{
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
//     fetch(url)
//     .then(res=>res.json())
//     .then(data=>displayMealDetails(data.meals[0]))
//     .catch(error=>{
//         alert(error)
//     })
// }

const loadMealDetails2 = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayMealDetails(data.meals[0])
    }
    catch (error) {
        alert(error)
    }
}

const displayMealDetails = (meals) => {
    // console.log(meals)
    // const modalContent = document.getElementById('modal-content')
    // const modalHeadDiv = document.createElement('div')
    // modalHeadDiv.classList.add('modal-header')
    // modalHeadDiv.innerHTML = `
    // <h1 class="modal-title fs-5" id="exampleModalLabel">${meals.strMeal}</h1>
    // <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    // `
    // modalContent.appendChild(modalHeadDiv)
    let i = 1
    const header = document.getElementById('exampleModalLabel')
    header.innerText = meals.strMeal
    document.getElementById('strCategory').innerText = meals.strCategory
    document.getElementById('strArea').innerText = meals.strArea

}

loadMeals('fish')