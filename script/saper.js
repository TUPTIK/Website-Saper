
// function Randint (a, b) {
//     return Math.floor(Math.random() * (b - a + 1)) + a;
// };

let A = 20;
let B = 20;
let Bombs = 60;
let Ended = false;
let NumberOfOpened = 0

let SaperMap = MapCreating(A,B,Bombs);
let MapStatus = MapStatusSeting(SaperMap);
console.log(SaperMap)

el = document.getElementsByClassName("win")
for (let i=0;i<el.length;i+=1){
    el[i].style.display = 'none';
}

el = document.getElementsByClassName("defeat")
for (let i=0;i<el.length;i+=1){
    el[i].style.display = 'none';
}

const box = document.getElementById("saper_cointeiner");

const container = document.createElement("div");
container.style.height = `${A*16}px`;
container.style.width = `${B*16}px`;
container.className = "Saper"

box.appendChild(container);

TileSeting(SaperMap)
