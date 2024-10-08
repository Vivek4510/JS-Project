let btn = document.getElementById("searchbtn");
let container = document.getElementById("container");
let dropdown = document.getElementById("dropdown");
let recipecontainer = document.getElementById("recipecontainer");
let closebtn = document.getElementById("closebtn");
let recipebox = document.getElementById("recipebox");
let opt1 = dropdown.options[0].value;
let opt2 = dropdown.options[1].value;
let opt3 = dropdown.options[2].value;



btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let input = document.getElementById("searchbox").value.trim();
    if(!input){
        container.innerHTML = `<h1>Type any meal in search box</h1>`;
        return;
    }
    recipe(input);

    document.getElementById("searchbox").value = "";
});

async function recipe(input) {
    if(dropdown.value==opt1){
        container.innerHTML = "Getting your recipes ready..."
        try{
        let apicall1 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        let data1 = await apicall1.json();

        container.innerHTML = "";
        data1.meals.map(food =>{
            let box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
            <img src="${food.strMealThumb}">
            <h2>${food.strMeal}</h2>
            <p>${food.strArea} Cuisine</p>
            <p>${food.strCategory} Dish</p>

            `
            let recipebtn = document.createElement("button");
            recipebtn.textContent = "View Recipe";
            recipebtn.addEventListener("click",()=>{
                openrecipe(food);
            });

            let ytbtn = document.createElement("button");
            ytbtn.textContent = "YOUTUBE";
            ytbtn.style.backgroundColor = "red";
            ytbtn.style.color = "white";
            ytbtn.addEventListener("click",()=>{
                window.open(`${food.strYoutube}`,"_self");
            })

            box.appendChild(recipebtn);
            box.appendChild(ytbtn);
            container.appendChild(box);
        });
    }
    catch(error){
        container.innerHTML = "<h1>Sorry!!! Unable to find the meal</h1>"
    }

}


    let fetchIngredients = (food)=>{
        let inglist = "";
        for(i=1;i<=20;i++){
            let ings = food[`strIngredient${i}`];
            if(ings){
                let measure = food[`strMeasure${i}`];
                inglist += `<li>${ings} : ${measure}</li>`
            }
            else{
                break;
            }
        }
        return inglist;
    }


    let openrecipe = (food)=>{
        recipebox.innerHTML = `
        <h1 class="name">${food.strMeal}</h1>
        <h3>INGREDIENTS : </h3>
        <ul class="inglist">${fetchIngredients(food)}</ul>
        <div class="process">
        <h3>PROCESS : </h3>
        <p>${food.strInstructions}</p>
        </div>
        `
        recipebox.parentElement.style.display = "block";
    }

    closebtn.addEventListener("click",()=>{
        recipecontainer.style.display = "none";
    })


    //search bycountry
    if(dropdown.value==opt2){
        container.innerHTML = ""
        let apicall2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`)
        let data2 = await apicall2.json();

        data2.meals.map((food)=>{
            let box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
            <img src="${food.strMealThumb}" id="countryimg">
            <h2>${food.strMeal}</h2>
            <p class="notice">Select the cuisine by name to view recipe</p>
            `
            container.appendChild(box);
        });
    }


    if(dropdown.value==opt3){
        container.innerHTML = ""
        let apicall3 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
        let data3 = await apicall3.json();
        
        data3.meals.map((food)=>{
            let box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
            <img src="${food.strMealThumb}" id="catimg">
            <h2>${food.strMeal}</h2>
            <p class="notice">Select the cuisine by name to view recipe</p>
            `
            container.appendChild(box);
        });
    }
    
}