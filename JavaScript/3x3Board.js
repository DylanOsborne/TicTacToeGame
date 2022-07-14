let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningRequirements = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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

    for(let i = 0; i <= 7; i++) {
        let winningRequirement = winningRequirements[i];
        let a = gameState[winningRequirement[0]];
        let b = gameState[winningRequirement[1]];
        let c = gameState[winningRequirement[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        } 

        if(a === b && b === c) {
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


