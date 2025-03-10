const flechita = document.getElementById("flechita");
const barraLateral = document.querySelector(".menu_grande");
const spans = document.querySelectorAll("span");
const main = document.querySelector("main");

flechita.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini_menu_grande");

    main.classList.toggle("min-main");

    spans.forEach(span => {
        span.classList.toggle("oculto");
        

    if (barraLateral.classList.contains("mini_menu_grande")) {
        flechita.style.transform = "rotate(180deg)";
    } else {
        flechita.style.transform = "rotate(0deg)";
    }
    });
});