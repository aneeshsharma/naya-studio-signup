// Variables for various elements
var maker_choice = document.getElementById("#maker-choice");
var designer_choice = document.getElementById("#designer-choice");

var choose = document.getElementsByClassName("choose")[0];
var registration = document.getElementsByClassName("registration")[0];

var alt_desg_btn = document.getElementsByClassName("alternate-desg-btn")[0];
var alt_maker_btn = document.getElementsByClassName("alternate-maker-btn")[0];

var choice = "NO";
// event listeners for the choices
maker_choice.addEventListener("click", () => {
    choose_maker();
    start_resgitration();
});

designer_choice.addEventListener("click", () => {
    choose_desg();
    start_resgitration();
});

alt_desg_btn.addEventListener("click", () => {
    no_choice();
});
alt_maker_btn.addEventListener("click", () => {
    no_choice();
});

function no_choice() {
    if (choice === "NO") return;
    choose.classList.add("no-choice");
    choose.classList.remove("designer-choice");
    choose.classList.remove("maker-choice");
    alt_desg_btn.classList.remove("active");
    alt_desg_btn.classList.add("inactive");
    alt_maker_btn.classList.add("inactive");
    alt_maker_btn.classList.remove("active");
    console.log("No Choice");
    choice = "NO";
}

function choose_maker() {
    if (choice === "MAKER") return;
    choose.classList.remove("no-choice");
    choose.classList.remove("designer-choice");
    choose.classList.add("maker-choice");
    alt_desg_btn.classList.add("active");
    alt_desg_btn.classList.remove("inactive");
    alt_maker_btn.classList.add("inactive");
    alt_maker_btn.classList.remove("active");
    console.log("Maker");
    choice = "MAKER";
}

function choose_desg() {
    if (choice === "DESG") return;
    choose.classList.remove("no-choice");
    choose.classList.remove("maker-choice");
    choose.classList.add("designer-choice");
    alt_desg_btn.classList.add("inactive");
    alt_desg_btn.classList.remove("active");
    alt_maker_btn.classList.add("active");
    alt_maker_btn.classList.remove("inactive");
    console.log("Desg");
    choice = "DESG";
}

// Funtion to initialize the resgistration page
function start_resgitration() {}
