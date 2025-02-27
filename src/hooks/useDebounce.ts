import { useCallback, useRef, useEffect } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
): T {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const callbackRef = useRef(callback);

    // Update the callback ref when callback changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        },
        [delay]
    ) as T;
}
