function MapCreating (A,B,Bombs) {
    function MapBase (a,b) {
        let map = [];

        for (let x = 0; x < a; x++) {
            let line = [];

            for (let y = 0; y < b; y++){
                line.push(0);
            };
            map.push(line);
        };

        return map
    }

    function SettingBombs (map,n) {
        let a = map.length
        let b = map[0].length

        let i = 0;
        while (i < n) {
            x = Math.floor(Math.random() * a);
            y = Math.floor(Math.random() * b);

            if (map[x][y] !== 9) {
                map[x][y] = 9;
                i ++;
            };
        }
        return map
    }

    function NumberCalculating (map) {
        const locals = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
        
        for (let i = 0; i < map.length; i++ ) {
            for (let j = 0; j < map[0].length; j++ ) {
                if (map[i][j] === 0){
                    number = 0

                    for (const a of locals) {
                        if (i + a[0] >= 0 && i + a[0] < map.length && j + a[1] >= 0 && j + a[1] < map[0].length) {
                            let loc = map [i + a[0]] [j + a[1]]
                            if (loc === 9) {number += 1}
                        }
                    }

                map[i][j] = number
                }
            }
        }

        return map
    }
    let map = MapBase(A,B)
    map = SettingBombs(map,Bombs)
    map = NumberCalculating(map)
    return map
}

function MapStatusSeting(map) {
    let mapstatus = []
    for (let i = 0; i < map.length; i++ ) {
        mapstatus.push([])
        for (let j = 0; j < map[0].length; j++ ) {
            mapstatus[i].push({
                "content" : map[i][j],
                "flag" : false,
                "opened" : false,
            })
        }
    }
    return mapstatus
}

function TileSeting (map) {
    for (let i = 0; i < map.length; i++ ) {
        for (let j = 0; j < map[0].length; j++ ) {
            let element =  document.createElement("div");
            element.className = `${i}-${j}`
            element.id = `${i}-${j}`
            element.addEventListener("click", function (e){
                LClick(i,j)
            })
            element.addEventListener("contextmenu", function (e) { 
                e.preventDefault()
                RClick(i,j)
            })

            let img1 = document.createElement("div");
            let i1 = document.createElement("img");
            i1.src = `./SaperTextures/Numbers/Ground_${map[i][j]}.png`;
            img1.appendChild(i1);
            img1.style.display = "none"
            img1.className = `${i}-${j}__img1`;

            element.appendChild(img1)

            let img2 = document.createElement("div");
            let i2 = document.createElement("img");
            i2.src = `./SaperTextures/Closed_Field.png`;
            img2.appendChild(i2);
            img2.style.display = "block"
            img2.className = `${i}-${j}__img2`;

            element.appendChild(img2)

            let img3 = document.createElement("div");
            let i3 = document.createElement("img");
            i3.src = `./SaperTextures/Flag.png`;
            img3.appendChild(i3);
            img3.style.display = "none"
            img3.className = `${i}-${j}__img3`;

            element.appendChild(img3)
            

            element.style.width = "16px"
            element.style.height = "16px"

            container.appendChild(element)
        }
    }
}

function LClick(x,y) {
    if (MapStatus[x][y]["flag"] === false && MapStatus[x][y]["opened"] === false && Ended === false) {
        MapStatus[x][y]["opened"] = true
        let el = document.getElementsByClassName(`${x}-${y}__img1`)
        for (let i=0;i<el.length;i+=1){
            el[i].style.display = 'block';
        }
        el = document.getElementsByClassName(`${x}-${y}__img2`)
        for (let i=0;i<el.length;i+=1){
            el[i].style.display = 'none';
        }
        if (MapStatus[x][y]["content"] === 0) {OpeningEmty(x,y)}
        NumberOfOpened ++

        if (SaperMap[x][y] === 9) {Defeat()}

        if (NumberOfOpened === SaperMap.length*SaperMap[0].length - Bombs) {Win()}
    }
}

function RClick(x,y) {
    let d = false
    if (MapStatus[x][y]["opened"] === false && MapStatus[x][y]["flag"] === false && Ended === false) {
        MapStatus[x][y]["flag"] = true
        let el = document.getElementsByClassName(`${x}-${y}__img3`)
        for (let i=0;i<el.length;i+=1){
            el[i].style.display = 'block';
        }
        el = document.getElementsByClassName(`${x}-${y}__img2`)
        for (let i=0;i<el.length;i+=1){
            el[i].style.display = 'none';
        }
        d = true
    }
    if (MapStatus[x][y]["flag"] === true && d === false) {
        MapStatus[x][y]["flag"] = false
        let el = document.getElementsByClassName(`${x}-${y}__img2`)
        for (let i=0;i<el.length;i+=1){
            el[i].style.display = 'block';
        }
        el = document.getElementsByClassName(`${x}-${y}__img3`)
        for (let i=0;i<el.length;i+=1){
            el[i].style.display = 'none';
        }
    }
}

function OpeningEmty(x,y) {                                                     // 0, 1, 2,
    const locals = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];     // 3, XY 4,
                                                                                // 5, 6, 7,
    for (let i = 0; i < locals.length; i ++){
        if (x + locals[i][0] >= 0 && x + locals[i][0] < MapStatus.length && y + locals[i][1] >= 0 && y + locals[i][1] < MapStatus[0].length) {
            LClick(locals[i][0] + x, locals[i][1] + y)
        }
    }
}

function Win() {
    Ended = true;
    el = document.getElementsByClassName("win")
    for (let i=0;i<el.length;i+=1){
        el[i].style.display = 'block';
    }
}

function Defeat() {
    Ended = true;
    el = document.getElementsByClassName("defeat")
    for (let i=0;i<el.length;i+=1){
        el[i].style.display = 'block';
    }
}
