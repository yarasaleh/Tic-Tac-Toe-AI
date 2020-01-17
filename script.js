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
    origBoard = Array.from(Array(9).keys());//1-9 == 0-8
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
    document.getElementById(eventId).innerText = player;
    let gameWon = checkWinner(origBoard , player );
    if(gameWon){
        gameOver(gameWon);
    }
}
function checkWinner(board , player){
    let plays = board.reduce((a,element,index) =>
    (element === player)  ? a.concat(index):a,[]);
    //
    let gameWon = null;
    for(let [index , win] of winCombos.entries()){
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
