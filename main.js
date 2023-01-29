//Select Elements
let startBtn = document.querySelector("button.start");
let pName = document.querySelector(".player-info .name span");
let wrongTries = document.querySelector(".player-info .tries span")
let tiles = document.querySelectorAll(".memory-game .tile");
let timer = document.querySelector(".player-info .timer");
let loose = document.querySelector(".loose");

//Success Counter
let successCounter = 0;


loose.children[0].children[1].onclick = () => {
    location.reload();
    setTimeout(() => startBtn.click(), 5000);
}
startBtn.onclick = () => {
    let userName = prompt("Your Name IS : ");
    if (userName === null || userName == "") {
        pName.innerHTML = "Unknown";
    } else {
        pName.innerHTML = userName;
    }
    startBtn.parentElement.remove();
    tiles.forEach(tile => {
        tile.classList.add("flipped");
        setTimeout(() => {
            tile.classList.remove("flipped");
        }, 2000)
    });
    wrongTries.innerHTML = 0;
    randomizeArray(tiles);
    gameTimer();
}

tiles.forEach(tile => {
    tile.onclick = () => {

        tile.classList.add("flipped");
        let filteredArr = Array.from(tiles).filter((tile) => {
            return tile.classList.contains("flipped")
        });
        if (filteredArr.length === 2) {
            document.querySelector(".memory-game").style.pointerEvents = "none";
            setTimeout(() => {
                document.querySelector(".memory-game").style.pointerEvents = "all";
            }, 1000);
            if (filteredArr[0].dataset.tile === filteredArr[1].dataset.tile) {
                filteredArr.forEach(el => {
                    el.children[1].style.opacity = "0.5";
                    el.classList.remove("flipped");
                    el.classList.add("success");
                    successCounter++;
                })
            } else {
                setTimeout(() => {
                    filteredArr.forEach(el => {
                        el.classList.remove("flipped");
                    })
                    wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
                }, 1000);

            }
        }
        if (successCounter === tiles.length) {
            setTimeout(() => {
                loose.style.display = "block";
                loose.children[0].children[0].innerHTML = "Great! You Made It..."
            }, 2000)
        }
    }
})

//Create An Array With Rearrange Indexes Values
function randomizeArray(arr) {
    let orderedArr = Array(...arr.keys()), currentIndex = orderedArr.length, temp;
    while (currentIndex > 0) {
        let randomNum = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temp = orderedArr[currentIndex];
        orderedArr[currentIndex] = orderedArr[randomNum];
        orderedArr[randomNum] = temp;
    }
    reorderTiles(tiles, orderedArr);
}
//Order Tiles Randomly
function reorderTiles(tiles, arr) {
    tiles.forEach((tile, index) => {
        tile.style.order = arr[index];

    })
}
//Set Timer
function gameTimer() {
    let duration = 300;
    let timerInterval = setInterval(() => {
        let minutes = `0${Math.floor(duration / 60)}`
        let seconds = duration % 60 < 10 ? `0${duration % 60}` : duration % 60;
        timer.innerHTML = `${minutes}:${seconds}`;
        if (successCounter !== tiles.length) {
            if (duration > 0) {
                duration--;
            }
            else {
                clearInterval(timerInterval);
                loose.style.display = "block";

            }
        } else {
            clearInterval(timerInterval);
        }
    }, 1000)
}