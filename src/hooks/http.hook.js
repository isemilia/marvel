import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
        setProcess('loading');

        try {
            const response = await fetch(url, {method, headers, body});
            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status} ${response.statusText}`)
            }
            const data = await response.json();

            setProcess('confirmed');
            return data;
        } catch (e) {
            setProcess('error');
            throw e;
        } 
    }, []);

    const clearError = useCallback(() => {
        setProcess('waiting');
    }, []);

    return {
        request,
        clearError,
        process,
        setProcess,
    }
} 