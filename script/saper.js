

// function Randint (a, b) {
//     return Math.floor(Math.random() * (b - a + 1)) + a;
// };

let A = 20;
let B = 20;
let Bombs = 60;

// funkcje z map.js
let SaperMap = MapCreating(A,B,Bombs);
let MapStatus = MapStatusSeting(SaperMap);
console.log(SaperMap)

const box = document.getElementById("saper_cointeiner");

const container = document.createElement("div");
container.style.height = `${A*16}px`;
container.style.width = `${B*16}px`;
container.className = "Saper"

box.appendChild(container);

TileSeting(SaperMap)


