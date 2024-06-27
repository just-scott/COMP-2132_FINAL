const computerPlayerNames = ['DB Cooper', 'Wild Bill', 'El Matador', 'Devilish Dan', 'Al Capone', 'Don Juan'];

let playerName = prompt('Enter your name to play: ');
let winCount = 0;
let lossCount = 0;

let player;
let computer;



function setupGame()
{
    player = new Player(playerName);
    computer = new Player(getComputerName());
}

function getComputerName()
{
    return computerPlayerNames[Math.floor(Math.random() * computerPlayerNames.length) + 1];
}