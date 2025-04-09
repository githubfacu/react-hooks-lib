import * as React from 'react'

import { useIsVisible } from '../hooks'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}

export const event = () => {
    console.log('send tracking event')
}

export const withTraking = <P extends Props>(BaseComponent: React.FC<P>) => {

    return function Component (props: P){
        const refDiv = React.useRef<HTMLDivElement>(null)
        const seen = React.useRef<boolean>(false)
        const isVisible = useIsVisible(refDiv)

        React.useEffect(() => {
            if (isVisible && !seen.current) {
                event()
                seen.current = true
            }
        }, [isVisible])
        
        return (
            <div ref={refDiv}>
                <BaseComponent {...props} />
            </div>
        )        
    }

}
