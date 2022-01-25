import { enwords } from "../WordsList/en-words";
import { eswords } from "../WordsList/es-words";
import { types } from "./Types";

export const wordsReducer = (state, action) => {
// This reducer will have control on the words generation
    switch (action.type) {
        
        // Generate words according to the selected language and generate an ID for each word
        case types.GenerateWords :
            state = []
            const allCharacters = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ';

            for (let index = 0; index < 350; index++) {

                const allCharactersToArray = [...allCharacters];
                const shuffleCharacters = []
                let word;

                for (let index = 0; index < 40; index++) {
                    shuffleCharacters.push(allCharactersToArray[Math.floor(Math.random() * ((allCharactersToArray.length - 1) + 1) + 0)])
                }

                if(action.payload ==='Spanish'){
                     word = eswords[Math.floor(Math.random() * ((enwords.length - 1) + 1) +1 )]             
                }
                if(action.payload === 'English'){
                    word = enwords[Math.floor(Math.random() * ((enwords.length - 1) + 1) +1 )]
                }

                state.push({
                    id: shuffleCharacters.join(''),
                    word
                })
            }
            return state;

        // Remove words
        case types.RemoveWords:
            return state.splice(0, action.payload);

        default:
            return state;    
    }
}

// export const countersReducer = (state = {}, action) => {

//     switch (action.type) {
//         case types.NextWord: 
//             return (
//                 {...state,
//                     countWord : action.payload
//                 }
//             )
//         case types.Correct:
//             return (
//                 {
//                     ...state,
//                     countCorrect : action.payload
//                 }
//             )
//         case types.Incorrect:
//             return (
//                 {
//                     ...state,
//                     countIncorrect : action.payload
//                 }
//             )
//         case types.CharactersTyped:
//             return(
//                 {
//                     ...state,
//                     countCharsTyped: action.payload
//                 }
//             )     
//         case types.Reset:
//             console.log("Esto es")
//             return(
//                 {
//                     countWord: 0,
//                     countCorrect: 0,
//                     countIncorrect: 0,
//                     countCharsTyped: 0
//                 }
//             )    
//         default:
//             return state;
//     }
// }