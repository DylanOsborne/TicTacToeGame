let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningRequirements = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14 ,15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10 , 15],
    [3, 6, 9, 12]
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

    for(let i = 0; i <= 9; i++) {
        let winningRequirement = winningRequirements[i];
        let a = gameState[winningRequirement[0]];
        let b = gameState[winningRequirement[1]];
        let c = gameState[winningRequirement[2]];
        let d = gameState[winningRequirement[3]];

        if(a === '' || b === '' || c === '' || d === '') {
            continue;
        } 

        if(a === b && b === c && c === d) {
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

