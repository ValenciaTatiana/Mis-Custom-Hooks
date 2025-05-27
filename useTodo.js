import { useEffect, useReducer } from "react"
import { todoReducer } from "../06.useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (todoId) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: todoId
        }

        dispatch(action);
    }

    const handleToggleTodo = (todoId) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: todoId
        }

        dispatch(action);
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}