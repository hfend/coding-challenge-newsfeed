import React, { useState, useEffect } from 'react'


export function useIsVisible(ref: React.MutableRefObject<null>, options:IntersectionObserverInit | undefined = undefined) {

    // Not running in browser or IntersectionObserver unsupported? return undefined asap
    if (typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
        return undefined
    }

    const [isIntersecting, setIntersecting] = useState<boolean | undefined>(undefined)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        options
    )

    useEffect(() => {

        if (ref.current) observer.observe(ref.current)

        return () => {
            // Remove the observer as soon as the component is unmounted
            observer.disconnect()
        }
    }, [])

    return isIntersecting
}