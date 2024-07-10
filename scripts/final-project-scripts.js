const $playerName = $('#playerName');
const $playerScore = $('#playerScore');
const $playerFirstRoll = $('#playerFirstRoll');
const $playerFirstRollScore = $('#playerScoreFirstRoll');

const $computerName = $('#computerName');
const $computerScore = $('#computerScore');

const $advanceGame = $('#advanceGame');
const $helpButton = $('#helpButton');
const $dieFaces = $('.dieFaces');
const $handScores = $('.handScores');
const $winCount = $('#wins');
const $tieCount = $('#ties');
const $lossCount = $('#losses');
const $diceGif = $('#diceGif');
const $gameMessage = $('#gameMessage');
const $helpPopup = $('#helpPopup');
const $closePopup = $('#closePopup');

const computerPlayerNames = ['DB Cooper', 'Wild Bill', 'El Matador', 'Devilish Dan', 'Al Capone', 'Don Juan'];
const DICE_FADE_DURATION = 1500;


let playerName = prompt('Enter your name to play: ');
let winCount = 0;
let tieCount = 0;
let lossCount = 0;
let turnNumber = 0;

let rollingDiceTimeout;
let buttonTimeout;

let player;
let computer;


/**
 * resets score counters, turn number,
 * gets a new opponent, and starts the game again
 */
function setupGame()
{
    console.log('setting up game');

    $dieFaces.hide();
    $handScores.hide();
    $diceGif.hide();
    $helpPopup.hide();

    $advanceGame.val('Roll Next Hand');
    $gameMessage.text('Roll to play');

    player = new Player(playerName);
    computer = new Player(getComputerName());

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
    let $elementsSelector;

    switch (turnNumber)
    {
        case 0:
            $elementsSelector = $('.firstRoll');
            break;
        case 1:
            $elementsSelector = $('.secondRoll');
            break;
        case 2:
            $elementsSelector = $('.thirdRoll');
            break;
        default:
            console.log(`Error: turn number is ${turnNumber}`);
    }
    return $elementsSelector;
}

function getDieFaceImg(number)
{
    return `images/die-face-${number}.png`;
}

function showDiceRolled()
{
    let $displayElement = getDieElement();

    $displayElement.each(function ()
    {

        let $this = $(this);

        if ($this.hasClass('playerRoll'))
        {
            player.dice.forEach(function (die, i)
            {
                $this.children(`:nth-child(${i+1})`).attr('src', getDieFaceImg(die));
                $this.children(`:nth-child(${i+1})`).fadeIn(DICE_FADE_DURATION);
                $this.children(':nth-child(3)').text(player.computeScore()).fadeIn(DICE_FADE_DURATION);
            });
        }
        else
        {
            computer.dice.forEach(function (die, i)
            {
                $this.children(`:nth-child(${i+1})`).attr('src', getDieFaceImg(die));
                $this.children(`:nth-child(${i+1})`).fadeIn(DICE_FADE_DURATION);
                $this.children(':nth-child(3)').text(computer.computeScore()).fadeIn(DICE_FADE_DURATION);
            });
        }
    });
}

function animateDice()
{
    $diceGif.fadeIn(400);

    rollingDiceTimeout = setTimeout(function ()
    {
        $diceGif.fadeOut(1000);
    }, 1500);
}

function takeTurn()
{
    $advanceGame.prop('disabled', true);
    clearTimeout(rollingDiceTimeout);

    player.clearDice();
    computer.clearDice();

    player.rollDice();
    computer.rollDice();

    player.score += player.computeScore();
    computer.score += computer.computeScore();
    $playerScore.text(player.score);
    $computerScore.text(computer.score);

    showDiceRolled();

    animateDice();

    buttonTimeout = setTimeout(function ()
    {
        $advanceGame.prop('disabled', false);
    }, 1000);

    turnNumber++;

    if (turnNumber >= 3)
    {
        $advanceGame.val('Play Again!');

        if (player.score > computer.score)
        {
            winCount ++;
            $winCount.text(winCount);
            $gameMessage.text("You won!");
        }
        else if (player.score === computer.score)
        {
            tieCount ++;
            $tieCount.text(tieCount);
            $gameMessage.text('Tie game!');
        }
        else
        {
            lossCount ++;
            $lossCount.text(lossCount);
            $gameMessage.text('Better luck next time');
        }
    }
}

$helpButton.click(function ()
{
    $helpPopup.fadeIn(500);
});

$closePopup.click(function ()
{
    $helpPopup.fadeOut(1000);
})





