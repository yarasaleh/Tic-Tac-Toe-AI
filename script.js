var origBoard;
const HUMAN = 'O';
const AI = 'X';
const winCombos = [
    [0,3,6],
    [0,1,2],
    [2,5,8],
    [6,7,8],
    [2,4,6],
    [0,4,8],
    [3,4,5],
    [1,4,7]
];
const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
    document.querySelector('.endgame').style.display='none';
    origBoard = Array.from(Array(9).keys());//0-8 || length:9  || has {1:"1",2:"2"..}
    for(var i = 0 ; i < cells.length ; i++){
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick, false);
    }
}
function turnClick(theEvent){
    turn(theEvent.target.id , HUMAN);
}
function turn(eventId , player){
    origBoard[eventId] = player;
    // the board has Xs and Os
    document.getElementById(eventId).innerText = player;
    let gameWon = checkWinner(origBoard , player );
    if(gameWon){
        gameOver(gameWon);
    }
}
function checkWinner(board , player){
    // next line is to find the places in the board that has already played in
    let plays = board.reduce((accumulator,element,index) =>
    (element === player)  ? accumulator.concat(index):accumulator,[]);
    // reduce -> goes through every element in  the board array
    // return one single value which is an array that has all values and index or just values if the player is not same
    let gameWon = null;
    //next line to check if someone has won
    for(let [index , win] of winCombos.entries()){
        // taking one array in winCombos and check using every and > -1 if plays has the same index played on
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            // has the player played in every spot that counts as win
            gameWon = {index: index ,player: player };
            break;
        }
    }
    return gameWon;
}
function howWon(gameWon){
    if(gameWon.player == HUMAN){
        return "You Won";
    } else if (gameWon.player == AI) {
        return "You Lost";
    }else{
        return "Draw !";
    }
}
function gameOver(gameWon){
    document.querySelector('.endgame').style.display='block';
    document.getElementById('text').innerText = howWon(gameWon);
    for (var i = 0 ; i < cells.length ; i++){
        cells[i].removeEventListener('click',turnClick, false);
    }

}
