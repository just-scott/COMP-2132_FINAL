//this is a temp file to help get things setup
//TODO delete this file before submitting the project

$playerName.text(playerName);
$playerFirstRoll.children(':nth-child(1)').attr('src', 'images/die-face-1.png');
$playerFirstRoll.children(':nth-child(2)').attr('src', 'images/die-face-5.png');

setupGame();

$advanceGame.click(function ()
{
    player.clearDice();
    player.rollDice();

    playerScore += player.computeScore();
    $playerScore.text(playerScore);

    showDiceRolled();
})