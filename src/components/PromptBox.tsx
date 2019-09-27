import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import { css, keyframes } from 'emotion'
import Char from './PromptChar'
import { no_select } from '../assets/styles/customClasses'

const ACITVE_COLOR = '#FF00FF'
const DEFAULT_COLOR = '#DDDDDD'

type PromptBoxProps = {
    promptModel: any[]
    promptIndex: number
    isFocused?: boolean
}

export const PromptBox = (props: PromptBoxProps) => {
    const { promptIndex, promptModel, isFocused } = props

    const clickToFocusMessage = !isFocused ? (
        <div className={focusMessageClass}>Click Here to Activate</div>
    ) : null

    // Recurse each word in the prompt model
    const renderCharsByWord = (array: PromptModel, i: number, acc: any[]) => {
        if (array.length > 0 && i < array.length) {
            const word = renderCharsInWord(array, i, [])
            const wordElement = <div className={wordClass}>{word}</div>
            return renderCharsByWord(array, i + word.length, [
                ...acc,
                wordElement,
            ])
        } else {
            return acc
        }
    }

    // Recurse each char in prompt model and return a word followed by a space if not the end
    const renderCharsInWord = (array: PromptModel, i: number, acc: any[]) => {
        if (i >= array.length) {
            return acc
        }
        const isCurrent = promptIndex === i
        const char = (
            <Char
                char={array[i].char}
                isActive={isCurrent && isFocused}
                missed={array[i].missed}
                passed={i < promptIndex}
            />
        )

        if (array[i].char !== ' ') {
            return renderCharsInWord(array, i + 1, [...acc, char])
        } else {
            return [...acc, char]
        }
    }

    return (
        <div className={wrapperClass}>
            <div className={promptBoxClass(isFocused)}>
                <div className={row}>
                    {renderCharsByWord(promptModel, 0, [])}
                </div>
            </div>
            {clickToFocusMessage}
        </div>
    )
}

const wrapperClass = css`
    display: flex;
    position: relative;
    width: 100%;
`
const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`
const focusMessageClass = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: rgb(255, 203, 107);

    animation: ${fadeIn} 1s;
`

const promptBoxClass = isFocused => css`
    display: flex;
    flex-flow: column;
    width: 100%;
    min-height: 150px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 20px;
    font-family: 'Source Code Pro', monospace;
    font-size: 1.5rem;
    clip-path: inset(0% 0% round 10px);

    ${no_select};

    ${!isFocused && `filter: blur(4px);`};
    ${!isFocused
        ? `transition: 1s filter cubic-bezier(.12,.9,.79,1);`
        : `transition: .5s filter cubic-bezier(.12,.9,.79,1);`};
`

const row = css`
    display: flex;
    flex-flow: row wrap;
`
const wordClass = css`
    display: flex;
    flex-flow: row;
    margin-bottom: 15px;
`

export default PromptBox
