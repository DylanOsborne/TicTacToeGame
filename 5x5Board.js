let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let gameActive = true; 

const winningRequirements = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12 ,13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
];

function blockClickedOn(clickedBlockEvent) {
    const clickedBlock = clickedBlockEvent;

    const clickedBlockIndex = parseInt(
        clickedBlock.getAttribute("data-block-index")
    );

    if(gameState[clickedBlockIndex] !== "" || gameActive === false) {
        return
    }

    blockPlayed(clickedBlock, clickedBlockIndex);
    checkForWIn();
}

function blockPlayed(clickedBlock, clickedBlockIndex) {

    gameState[clickedBlockIndex] = currentPlayer;
    clickedBlock.innerHTML = currentPlayer; 
}

function checkForWIn() {
    let roundWon = false;

    for(let i = 0; i <= 11; i++) {
        let winningRequirement = winningRequirements[i];
        let a = gameState[winningRequirement[0]];
        let b = gameState[winningRequirement[1]];
        let c = gameState[winningRequirement[2]];
        let d = gameState[winningRequirement[3]];
        let e = gameState[winningRequirement[4]];

        if(a === '' || b === '' || c === '' || d === '' || e === '') {
            continue;
        } 

        if(a === b && b === c && c === d && d === e) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        document.querySelector('.status_display').innerHTML = currentPlayer + " has won";
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");

    if(roundDraw) {
        document.querySelector('.status_display').innerHTML = "Draw";
        gameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer() {

    if(currentPlayer == "X") {
        currentPlayer = "O";
    } else if(currentPlayer == "O") {
        currentPlayer = "X";
    }
}

