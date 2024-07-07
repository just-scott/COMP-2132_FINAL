//this is a temp file to help get things setup
//TODO delete this file before submitting the project

$playerName.text(playerName);
$playerFirstRoll.children(':nth-child(1)').attr('src', 'images/die-face-1.png');
$playerFirstRoll.children(':nth-child(2)').attr('src', 'images/die-face-5.png');

$('#computerSecondRoll').children(':nth-child(2)').attr('src', 'images/die-face-5.png');

setupGame();

$advanceGame.click(function ()
{
    console.log(`player dice pre clear: ${player.dice}`);
    player.clearDice();

    console.log(`player dice should be empty: ${player.dice}`);
    player.rollDice();

    console.log(`player dice after new roll: ${player.dice}`);

    computer.clearDice();
    computer.rollDice();

    console.log(player.dice);
    console.log(player.computeScore());

    player.score += player.computeScore();
    $playerScore.text(player.score);

    showDiceRolled();

    turnNumber ++;
})