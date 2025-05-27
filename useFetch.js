import { useState, useEffect } from "react";

const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
        error: null
    });

    const getFetch = async () => {

        //Revisamos el caché, si existe la url y la data la retornamos y no hacemos la petición
        if (localCache[url]) {
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoandingState();

        const resp = await fetch(url);

        // Sleep 2 seconds
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: resp.statusText
            });
            return;
        }
        const data = await resp.json();

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })

        //Manejo del Caché
        localCache[url] = data;
    }

    useEffect(() => {
        getFetch();
    }, [url]);

    const setLoandingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: null,
            error: null
        });
    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };
}