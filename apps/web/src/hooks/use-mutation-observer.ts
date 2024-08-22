import * as React from 'react'

export const useMutationObserver = (
    ref: React.MutableRefObject<HTMLElement | null>,
    callback: MutationCallback,
    options = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
    },
) => {
    React.useEffect(() => {
        if (ref.current) {
            const observer = new MutationObserver(callback)
            observer.observe(ref.current, options)
            return () => observer.disconnect()
        } else {
            return
        }
    }, [ref, callback, options])
}
