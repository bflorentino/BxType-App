import { useState } from 'react'

export const useCounter = ( initialValue = 0 ) => {

    const [counter, setCounter] = useState(initialValue);

    const increment = (factor = 1) => setCounter(counter + factor);
    const decrement = (factor = 1) => setCounter(counter - factor);
    const reset = (value) => setCounter(value);

    return {
        counter,
        increment,
        decrement,
        reset
    }
}