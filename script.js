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
    if(typeof(origBoard[theEvent.target.id]) == 'number'){
        turn(theEvent.target.id , HUMAN); 
        if(!checkTie()){
            turn(bestSpot(),AI);
        }
    }
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

function gameOver(gameWon){
    document.querySelector('.endgame').style.display='block';
    document.getElementById('text').innerText = (gameWon.player == HUMAN)?"You Won":"You Lost";
    for (var i = 0 ; i < cells.length ; i++){
        cells[i].removeEventListener('click',turnClick, false);
    }

}
function emptySquares(){
    return origBoard.filter( s => typeof(s) == 'number');
}
function bestSpot(){
    return minimax(origBoard , AI).index;
}
function checkTie(){
    if(emptySquares().length == 0){
        for( var i = 0 ; i < cells.length ; i++  ){
            cells[i].removeEventListener('click',turnClick, false);
        }
        document.querySelector('.endgame').style.display='block';
        document.getElementById('text').innerText = "Draw !";
        return true;
    }
    return false;
}



// Minimax Algorithm
function minimax( newBoard , player){
    var availSpots = emptySquares(newBoard);
// | 1 |  Return a value if a terminal state is found
    if(checkWinner(newBoard , HUMAN)){
        return {score: -10};
    }else if (checkWinner(newBoard , AI)){
        return {score: 10};
    }else if (availSpots.length === 0 ){
        return {score: 0};
    }
    var moves = [];
// | 2 |  Go through avaliable sopts on the board
    for (var i = 0 ; i < availSpots.length ; i++){
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

// | 3 |  Call the minimax function on each avaliable spot
        if(player == AI){
            var result = minimax(newBoard , HUMAN);
            move.score = result.score;
        }else{
            var result = minimax(newBoard , AI);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }
    var bestMove;
// | 4 |  Evaluate returning values from function calls
    if(player == AI){
        var bestScore = -Infinity ;
        for(var i = 0 ; i < moves.length ; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i ;
            }
        }
    }else{
        var bestScore = Infinity;
        for( var i = 0 ; i < moves.length ; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i ;
            }
        }
    }
// | 5 |  and return the best value
    return moves[bestMove];
}
