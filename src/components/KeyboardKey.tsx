import { h, Component } from 'preact'
import { css, keyframes } from 'emotion'
import { useEffect, useState } from 'preact/hooks'
import { memo } from 'preact/compat'
import { no_select } from '../assets/styles/customClasses'

const ACITVE_COLOR = '#FF00FF'
const DEFAULT_COLOR = '#DDDDDD'

type KeyboardKeyProps = {
    label: string
    isActive: boolean
}

export const KeyboardKey = memo((props: KeyboardKeyProps) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    // Avoid fading animation on load
    useEffect(() => {
        !isFirstLoad && !isLoaded && setIsLoaded(true)
    }, [props.isActive])

    useEffect(() => {
        setIsFirstLoad(false)
    }, [])

    const { isActive, label } = props

    return <div className={col(isActive, isLoaded)}>{label}</div>
})

const col = (isActive, isLoaded): string => {
    const color = isActive ? ACITVE_COLOR : DEFAULT_COLOR
    return css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        text-align: center;
        border: 2px solid ${color};
        color: ${color};
        border-radius: 10px;
        margin: 3px;
        font-weight: 700;
        background-color: ${isActive ? ACITVE_COLOR + '22' : 'transparent'};

        ${no_select};

        ${!isActive && isLoaded && `animation: ${fadeInactive} 1s;`};
    `
}

const fadeInactive = keyframes`
    from {color: ${ACITVE_COLOR}}
    to {color: ${DEFAULT_COLOR}}
    from {border-color: ${ACITVE_COLOR}}
    to {border-color: ${DEFAULT_COLOR}}
    from {background-color: ${ACITVE_COLOR}22}
    to {background-color: transparent}
`

export default KeyboardKey
