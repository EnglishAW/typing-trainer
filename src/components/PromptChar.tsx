import { h, Component } from 'preact'
import { css, keyframes } from 'emotion'
import { useEffect } from 'preact/hooks'
import { memo } from 'preact/compat'

const DEFAULT_COLOR = '#DDDDDD'
const PASSED_COLOR = '#777777'
const CONTRAST_COLOR = '#000000'
const MISSED_COLOR = 'rgb(243, 80, 108)'
const SPACE_COLOR = '#333333'

type PromptCharProps = {
    char: string
    isActive?: boolean
    missed?: boolean
    passed?: boolean
}

export const PromptChar = memo((props: PromptCharProps) => {
    const { isActive, missed, passed, char } = props
    const isSpace = char === ' ' ? true : false

    const charColor = missed
        ? MISSED_COLOR
        : isSpace
        ? SPACE_COLOR
        : passed
        ? PASSED_COLOR
        : DEFAULT_COLOR

    return (
        <div className={wrapperClass(charColor, isActive, blink(missed))}>
            {isSpace ? '_' : char}
        </div>
    )
})

const blink = missed => keyframes`
    from, to {
        background-color: #aaaaaa;
        color: ${missed ? MISSED_COLOR : CONTRAST_COLOR};
    }
    50% {
        background-color: transparent;
        color: ${missed ? MISSED_COLOR : DEFAULT_COLOR}
    }
`

const wrapperClass = (charColor, isActive, blink) => {
    return css`
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0px 1px;
        margin: 0px 1px;
        color: ${charColor};
        ${!!isActive && activeClass(blink)}};
    `
}

const activeClass = blink => css`
    background-color: #aaaaaa;
    animation: ${blink} 1s step-end infinite;
`

export default PromptChar
