export const CreateID = () => {
    
    // Creates a random ID for every created contact from a string with all letters (lowerCase and upperCase).
    const allCharacters = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ';
    const allCharactersToArray = [...allCharacters];
    const shuffleCharacters = []
    
    for (let index = 0; index < 30; index++) {
        shuffleCharacters.push(allCharactersToArray[Math.floor(Math.random() * ((allCharactersToArray.length - 1) + 1) + 0)])
    }
    return shuffleCharacters.join('');
}