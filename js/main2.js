var recepiesArr ;
let detailesArr ;
let areaDetailesArr ;
let searchlitterArr ;
let categoryArr ;
let cateArr ;
let areaArr;
let IngredientsArr ;
let detailesIngredientsArr;
let row = document.getElementById("ROW");
let listIcon = document.getElementById("list");
let blackList = document.getElementById("black");
let btn = document.getElementById("btn");
let searchBox = document.getElementById("searchBox");
let searchTag = document.getElementById("searchTag");
let userName = document.getElementById("Name");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userAge = document.getElementById("age");
let userPassword = document.getElementById("password");
let userRePassword = document.getElementById("repassword");
let alert1 = document.getElementById("alert1");
let alert2 = document.getElementById("alert2");
let alert3 = document.getElementById("alert3");
let alert4 = document.getElementById("alert4");
let alert5 = document.getElementById("alert5");
let alert6 = document.getElementById("alert6");

// loding-screen---------------------------------------

$(document).ready(function () {
  $("#loading").fadeOut(500, function () {
    $("body").css("overflow", "auto");
  });
});

//  side list  -------------------------------------------
$(".fa-bars").click(function () {
  if ($(".side2").css("left") == "0px") {
    $(".side").animate({ left: "0px" });
    $(".side2").animate({ left: 250 });
    $("#list").addClass("fa-xmark").removeClass("fa-bars");
  } else {
    $(".side2").animate({ left: 0 });
    $(".side").animate({ left: -"250" });
    $("#list").addClass("fa-bars").removeClass("fa-xmark");
  }
});

// home -------------------------------------------------------
function getData(mealName) {
  var xml = new XMLHttpRequest();
  xml.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      recepiesArr = JSON.parse(xml.response).meals;
    display();
  });
}
getData("");

function display() {
  let box = ``;
  for (let i = 0; i < recepiesArr.length; i++) {
   
    box += `
        <div class="col-md-3 p-3">
        <div class="item" onclick="getDataDetails(${recepiesArr[i].idMeal})">
                    <div class="meal">
                        <img src="${recepiesArr[i].strMealThumb}" class="w-100" alt="">
                        <h2>${recepiesArr[i].strMeal}</h2>
                    </div>
                    </div>
                </div>
                `;
  }

  row.innerHTML = box;
}

//  detailes  -------------------------------------------------------------------------------

function getDataDetails(id) {
  var xml = new XMLHttpRequest();
  xml.open("GET", `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      detailesArr = JSON.parse(xml.response).meals;

    displayDetailes();
  });
}

function displayDetailes() {
  let box = ``;
  for (let i = 0; i < detailesArr.length; i++) {
    box += `
    <div class="col-md-6">
    <img src="${detailesArr[i].strMealThumb}" class="w-100" alt="">
    <h2>"${detailesArr[i].strMeal}"</h2>
</div>
<div class="col-md-6">

    <h2 class="p-3">Instructions :</h2>
    <p>${detailesArr[i].strInstructions}</p>
    <h4 class="p-3"><span>Area : </span>${detailesArr[i].strArea}</h4>
    <h4 class="p-3"><span>Category :</span>${detailesArr[i].strCategory}</h4>
    <h3 class="p-3">Tags :</h3>
    <a href="${detailesArr[i].strYoutube}" class="btn btn-danger>youtube</a>
    
</div>

    `;
  }
  row.innerHTML = box;
}
//   search  -----------------------------------------------------------------------------------------

$("#searchTag").click(function () {
  row.innerHTML = "";
  $(".search").css({ display: "flex" });
  $(".submit").css({ display: "none" });
});

let firstLitter;
$("#litter").keyup(function () {
  firstLitter = litter.value;
  getData(firstLitter);
});

let meName;
$("#mealName").keyup(function () {
  meName = mealName.value;
  getData(meName);
});

// categories  -----------------------------------------------------------------------------------------------
$("#CategoriesTag").click(function () {
  row.innerHTML = "";
  $(".search").css({ display: "none" });
  $(".submit").css({ display: "none" });
  getcategoryData();
});

function getcategoryData() {
  var xml = new XMLHttpRequest();
  xml.open("GET", `https://www.themealdb.com/api/json/v1/1/categories.php`);
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      categoryArr = JSON.parse(xml.response).categories;

    displayCtegory();
  });
}

function displayCtegory() {
  
  let box = ``;
  for (let i = 0; i < categoryArr.length; i++) {
    console.log(categoryArr[i].strCategory);
    box += `
  <div class="col-md-3 p-3">
 
  <div class="item" onclick="getcategoryName(${categoryArr[i].strCategory})">
  <img src="${categoryArr[i].strCategoryThumb}" class="w-100" alt="">
  <h2> <h2>${categoryArr[i].strCategory}</h2></h2>
  </div>
  </div>
  `;
  }
  row.innerHTML = box;
}
function print(){
  console.log(e.target.value);
}


// ---------------------------------
function getcategoryName(category) {
  var xml = new XMLHttpRequest();
  xml.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      cateArr = JSON.parse(xml.response).meals;

    displayCtegoryName();
  });
}

function displayCtegoryName() {
  let box = ``;
  for (let i = 0; i < cateArr.length; i++) {
    box += `
  <div class="col-md-3 p-3">
  <div class="item" onclick="getDataDetails(${cateArr[i].idMeal})">
  <img src="${cateArr[i].strMealThumb}" class="w-100" alt="">
  <h2> <h2>${cateArr[i].strMeal}</h2></h2>
  </div>
  </div>
  `;
  }
  row.innerHTML = box;
}
//  area  --------------------------------------------------------------------------------------
$("#areaTag").click(function () {
  row.innerHTML = "";
  $(".search").css({ display: "none" });
  $(".submit").css({ display: "none" });
  getDataArea();
});

function getDataArea() {
  var xml = new XMLHttpRequest();
  xml.open("GET", `https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      areaArr = JSON.parse(xml.response).meals;
    displayAreae();
  });
}
function displayAreae() {
  let box = ``;
  for (let i = 0; i < areaArr.length; i++) {
    console.log(areaArr[i].strArea);
   

    box += `
        <div class="col-md-3 p-3">
        <div class="item bg-danger" onclick="getareaDetailes(${areaArr[i].strArea})">
                    <div class="meal">
                    <i class="fa-solid fa-earth-americas"></i>
                        <h2>${areaArr[i].strArea}</h2>
                    </div>
                    </div>
                </div>
                `;
  }

  row.innerHTML = box;
}
// -----------------------
function getareaDetailes(areaName) {
  var xml = new XMLHttpRequest();
  xml.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/filter.php?a="${areaName}"`
  );
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      areaDetailesArr = JSON.parse(xml.response).meals;
    displayareaDetailes();
  });
}

function displayareaDetailes() {
  let box = ``;
  for (let i = 0; i < areaDetailesArr.length; i++) {
    box += `
        <div class="col-md-3 p-3">
        <div class="item" onclick="getDataDetails(${areaDetailesArr[i].idMeal})">
                    <div class="meal">
                        <img src="${areaDetailesArr[i].strMealThumb}" class="w-100" alt="">
                        <h2>${areaDetailesArr[i].strMeal}</h2>
                    </div>
                    </div>
                </div>
                `;
  }

  row.innerHTML = box;
}
// ingrediants   -------------------------------------------------------------------------------------------
$("#IngredientsTag").click(function () {
  row.innerHTML = "";
  $(".search").css({ display: "none" });
  $(".submit").css({ display: "none" });
  getDataIngredients();
});

function getDataIngredients() {
  var xml = new XMLHttpRequest();
  xml.open("GET", `https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      IngredientsArr = JSON.parse(xml.response).meals;
    displayIngredients();
  });
}

function displayIngredients() {
  let box = ``;

  for (let i = 0; i < 20; i++) {
    box += `
        <div class="col-md-3 p-3">
        <div class="item" onclick="getIngredientsDetails(${IngredientsArr[i].strIngredient})">
                    <div class="meal w-50">
                    <i class="fa-solid fa-bowl-food"></i>
                        <h2>${IngredientsArr[i].strIngredient}</h2>
                        <p>${IngredientsArr[i].strDescription}</p>
                    </div>
                    </div>
                </div>
                `;
  }

  row.innerHTML = box;
}
// -------------------
function getIngredientsDetails(Ingredients) {
  var xml = new XMLHttpRequest();
  xml.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Ingredients}`
  );
  xml.send();
  xml.addEventListener("readystatechange", function () {
    if (xml.readyState == 4 && xml.status == 200)
      detailesIngredientsArr = JSON.parse(xml.response).meals;

    displayDetailesIngredients();
  });
}

function displayDetailesIngredients() {
  let box = ``;
  for (let i = 0; i < detailesIngredientsArr.length; i++) {
    box += `
    <div class="col-md-3">
    <div class="item" onclick="getDataDetails(${detailesIngredientsArr[i].idMeal})">
    <img src="${detailesIngredientsArr[i].strMealThumb}" class="w-100" alt="">
    <h2>"${detailesIngredientsArr[i].strMeal}"</h2>
</div>
</div>


    `;
  }
  row.innerHTML = box;
}
// contact   -------------------------------------------------------
$("#contact").click(function () {
  row.innerHTML = "";
  $(".search").css({ display: "none" });
  $(".submit").css({ display: "block" });
});

function userNameValid() {
  return /^[a-zA-Z]+/.test(userName.value);
}

function userEmailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    userEmail.value
  );
}

function userPhoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    userPhone.value
  );
}

function userAgeValid() {
  return /^[1-9][0-9]?$|^100$/.test(userAge.value);
}

function userPasswordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value);
}

function userRePasswordValid() {
  return userPassword.value == userRePassword.value;
}

function validation() {
  if (userNameValid()) {
    alert1.classList.replace("d-none", "d-block");
    alert1.innerHTML = "valid";
    alert1.classList.replace("bg-danger", "bg-green");
  } else {
    alert1.classList.replace("d-none", "d-block");
    alert1.classList.replace("bg-green", "bg-danger");
    alert1.innerHTML = "not valid";
  }

  if (userEmailValid()) {
    alert2.classList.replace("d-none", "d-block");
    alert2.innerHTML = "valid";
    alert2.classList.replace("bg-danger", "bg-green");
  } else {
    alert2.classList.replace("d-none", "d-block");
    alert2.classList.replace("bg-green", "bg-danger");
    alert2.innerHTML = "not valid";
  }

  if (userPhoneValid()) {
    alert3.classList.replace("d-none", "d-block");
    alert3.innerHTML = "valid";
    alert3.classList.replace("bg-danger", "bg-green");
  } else {
    alert3.classList.replace("d-none", "d-block");
    alert3.classList.replace("bg-green", "bg-danger");
    alert3.innerHTML = "not valid";
  }

  if (userAgeValid()) {
    alert4.classList.replace("d-none", "d-block");
    alert4.innerHTML = "valid";
    alert4.classList.replace("bg-danger", "bg-green");
  } else {
    alert4.classList.replace("d-none", "d-block");
    alert4.classList.replace("bg-green", "bg-danger");
    alert4.innerHTML = "not valid";
  }

  if (userPasswordValid()) {
    alert5.classList.replace("d-none", "d-block");
    alert5.innerHTML = "valid";
    alert5.classList.replace("bg-danger", "bg-green");
  } else {
    alert5.classList.replace("d-none", "d-block");
    alert5.classList.replace("bg-green", "bg-danger");
    alert5.innerHTML = "not valid";
  }

  if (userRePasswordValid()) {
    // alert6.classList.replace("d-none", "d-block");
    // alert6.innerHTML = "valid";
    // alert6.classList.replace("bg-danger", "bg-green");
  } else {
    alert6.classList.replace("d-none", "d-block");
    alert6.classList.replace("bg-green", "bg-danger");
    alert6.innerHTML = "not valid";
  }

  if (
    userNameValid() &&
    userEmailValid() &&
    userPhoneValid() &&
    userAgeValid() &&
    userPasswordValid() &&
    userRePasswordValid()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", "true");
  }
}

$("#Name").keyup(function () {
  validation();
});
$("#email").keyup(function () {
  validation();
});
$("#phone").keyup(function () {
  validation();
});
$("#age").keyup(function () {
  validation();
});
$("#password").keyup(function () {
  validation();
});
$("#repassword").keyup(function () {
  validation();
});
