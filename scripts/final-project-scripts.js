const $playerName = $('#playerName');
const $playerScore = $('#playerScore');
const $playerFirstRoll = $('#playerFirstRoll');
const $playerFirstRollScore = $('#playerScoreFirstRoll');

const $computerName = $('#computerName');

const $advanceGame = $('#advanceGame');
const $helpButton = $('#helpButton');

const computerPlayerNames = ['DB Cooper', 'Wild Bill', 'El Matador', 'Devilish Dan', 'Al Capone', 'Don Juan'];

let playerName = prompt('Enter your name to play: ');
let winCount = 0;
let lossCount = 0;
let playerScore = 0;
let computerScore = 0;
let turnNumber = 1;

let player;
let computer;


/**
 * resets score counters, turn number,
 * gets a new opponent, and starts the game again
 */
function setupGame()
{
    console.log('setting up game');

    player = new Player(playerName);
    computer = new Player(getComputerName());

    // $playerName.text(player.name);
    $computerName.text(computer.name);

    playerScore = 0;
    computerScore = 0;
    turnNumber = 1;
}

/**
 * picks a random opponent for each game
 * @returns {string} the name of the player's opponent
 */
function getComputerName()
{
    return computerPlayerNames[Math.floor(Math.random() * computerPlayerNames.length) + 1];
}

/**
 * gets the id of the element to display a die based on the turn number
 * @returns {*} the jQuery selector of the element to display a die
 */
function getDieElement()
{
    let elementId;

    switch (turnNumber)
    {
        case 1:
            elementId = $('#playerFirstRoll');
            break;
        case 2:
            elementId = $('#computerFirstRoll');
            break;
        case 3:
            elementId = $('#playerSecondRoll');
            break;
        case 4:
            elementId = $('#computerSecondRoll');
            break;
        case 5:
            elementId = $('#playerThirdRoll');
            break;
        case 6:
            elementId = $('#computerThirdRoll');
            break;
        default:
            console.log(`Error: turn number is ${turnNumber}`);
    }
    return elementId;
}

function getDieFaceImg(number)
{
    return `images/die-face-${number}.png`;
}

function showDiceRolled()
{
    let $displayElement = getDieElement();

    if (turnNumber % 2 === 0)
        //players turns are even, computer turns are odd
        //so on a player's turn this will evaluate as false (0)
    {//true, computer turn
        computer.dice.forEach(function (die, i)
        {
            $displayElement.children(`:nth-child(${i+1})`).attr('src', getDieFaceImg(die));
        });
    }
    else
    {
        player.dice.forEach(function (die, i)
        {
            $displayElement.children(`:nth-child(${i+1})`).attr('src', getDieFaceImg(die));
        })
    }
}