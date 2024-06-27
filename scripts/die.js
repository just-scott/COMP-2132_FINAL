class Die
{
    constructor(faces)
    {
        this.faces = Number(faces);
    }

    /**
     * @returns {number} a random face on the die, works for a die with any number of faces
     */
    getDice = function ()
    {
        return Math.floor(Math.random() * this.faces) + 1;
    }
}