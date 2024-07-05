const $playerName = $('#playerName');
const $playerScore = $('#playerScore');
const $playerFirstRoll = $('#playerFirstRoll');
const $playerFirstRollScore = $('#playerScoreFirstRoll');

const $computerName = $('#computerName');
const $computerScore = $('#computerScore');

const $advanceGame = $('#advanceGame');
const $helpButton = $('#helpButton');

const computerPlayerNames = ['DB Cooper', 'Wild Bill', 'El Matador', 'Devilish Dan', 'Al Capone', 'Don Juan'];

let playerName = prompt('Enter your name to play: ');
let winCount = 0;
let lossCount = 0;
let turnNumber = 0;

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

    player.score = 0;
    computer.score = 0;
    turnNumber = 0;

    $playerScore.text(player.score);
    $computerScore.text(computer.score);
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
        case 0:
            elementId = $('#playerFirstRoll');
            break;
        case 1:
            elementId = $('#computerFirstRoll');
            break;
        case 2:
            elementId = $('#playerSecondRoll');
            break;
        case 3:
            elementId = $('#computerSecondRoll');
            break;
        case 4:
            elementId = $('#playerThirdRoll');
            break;
        case 5:
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

    if (turnNumber % 2)
        //players turns are even, computer turns are odd
        //so on a player's turn this will evaluate as false (0)
    {//computer turn
        computer.dice.forEach(function (die, i)
        {
            $displayElement.children(`:nth-child(${i+1})`).attr('src', getDieFaceImg(die));
        });
    }
    else
    {//player turn
        player.dice.forEach(function (die, i)
        {
            $displayElement.children(`:nth-child(${i+1})`).attr('src', getDieFaceImg(die));
        });
    }
}

//TODO Change turn structure so that the game is 3 turns long, each turn both player and computer roll
//TODO update showDiceRolled to work with the new turn structure
//TODO update getDieElement to work with new turn structure. Maybe add new class to the elems and select both