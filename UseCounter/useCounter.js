import { useState } from "react";

export const useCounter = (initialValue = 10) => {

    const [counter, setCount] = useState(initialValue);

    const increment = (value = 1) => {
        setCount(counter + value);
    }

    const decrement = (value = 1) => {
        if (counter === 0) return;
        setCount(counter - value);
    }

    const reset = () => {
        setCount(initialValue);
    }
    
    return {
        counter,
        increment,
        decrement,
        reset
    }
}