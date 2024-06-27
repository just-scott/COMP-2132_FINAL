class Player
{
    constructor(name)
    {
        this.name = name;
        this.score = 0;
        this.dice = [];
    }

    /**
     * calculates the score gained from the dice the player just rolled
     * if either die is a 1, the score is zero
     * if both dice are the same number, score is sum of the dice * 2
     * otherwise the score is the sum of the dice
     * @returns {*|number} the score of the dice in the players hand
     */
    computeScore = function ()
    {
        let dice1 = this.dice[0];
        let dice2 = this.dice[1];

        if (dice1 === 1 || dice2 === 1)
        {
            return 0;
        }
        else if (dice1 === dice2)
        {
            return (dice1 + dice2) * 2;
        }
        else
        {
            return dice1 + dice2;
        }
    }
}
