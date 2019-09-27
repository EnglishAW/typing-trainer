import { h, Component } from 'preact'
import { useState, useMemo, useRef, useEffect } from 'preact/hooks'
import { memo } from 'preact/compat'
import { css, keyframes } from 'emotion'
import { Keyboard } from './Keyboard'
import { PromptBox } from './PromptBox'

const ACITVE_COLOR = '#FF00FF'
const DEFAULT_COLOR = '#DDDDDD'

const ModifierKeys = ['Control', 'Alt', 'Shift', 'Meta', 'Backspace']

export const TypingContainer = () => {
    const promptRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)
    const [keysPressed, setKeysPressed]: [string[], any] = useState([])
    const [keysPressed_keyboard, setKeysPressed_keyboard]: [
        string[],
        any
    ] = useState([])
    const [readyForNextChar, setReadyForNextChar] = useState(false)
    const [promptIndex, setPromptIndex] = useState(0)
    const promptText =
        'abcdabcd is a simple typing trainer built in Preact. Try typing this text!'
    // Memoize this call to to optimise for restarting the same prompt
    const freshPromptModel = useMemo(() => getNewPromptDetails(promptText), [
        promptText,
    ])
    const [promptModel, updatePromptModel] = useState(freshPromptModel)
    useEffect(() => {
        promptRef.current.focus({ preventScroll: true })
    }, [])

    const pkfk = keysPressed.slice()

    if (promptIndex >= promptText.length) {
        // We are at the end of the prompt
        // Reset missed chars and start back at the begining
        setPromptIndex(0)
        updatePromptModel(freshPromptModel)
    } else if (keysPressed.includes(promptModel[promptIndex].eventKey)) {
        // Corect Key Was Entered
        // Clear keys to get a clean read for the next char in prompt
        setKeysPressed([])
        // Move to next char in prompt
        setPromptIndex(promptIndex + 1)
    } else if (keysPressed.length > 0 && !promptModel[promptIndex].missed) {
        // Typo
        // Mark current char as missed and update the new Prompt Model
        updatePromptModel(markPromptCharMissed(promptModel, promptIndex))
    }

    const handleKeyDown = event => {
        // Prevent spacebar from scrolling the page
        if (event.code === 'Space') {
            event.preventDefault()
        }
        // Filter out modifier keys like shift
        // and only add the key once
        if (
            !ModifierKeys.includes(event.key) &&
            !keysPressed.includes(event.key)
        ) {
            // Keep track of the the currently pressed keys
            setKeysPressed([...keysPressed, event.key])
            setKeysPressed_keyboard([...keysPressed, event.key])
        }
    }
    const handleKeyUp = event => {
        if (keysPressed.includes(event.key)) {
            setKeysPressed(
                keysPressed.filter(key => {
                    return key !== event.key
                })
            )
        }
        if (keysPressed_keyboard.includes(event.key)) {
            setKeysPressed_keyboard(
                keysPressed_keyboard.filter(key => {
                    return key !== event.key
                })
            )
        }
    }
    return (
        <div
            ref={promptRef}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            className={wrapperClass}
            tabIndex={0}
            autoFocus={true}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        >
            <PromptBox
                isFocused={isFocused}
                promptModel={promptModel}
                promptIndex={promptIndex}
            />
            <Keyboard keysPressed={keysPressed_keyboard} />
        </div>
    )
}

// Create an initial Prompt Model based off of a given string
const getNewPromptDetails = promptText => {
    return promptText.split('').map(char => {
        return {
            char: char,
            eventKey: char,
            eventCode: `Key${char.toUpperCase()}`,
            missed: false,
        }
    })
}

// Return a new Prompt Model with the given char Index marked as missed
const markPromptCharMissed = (promptModel, searchIndex) => {
    return promptModel.map((charDetails, index) => {
        const missed = index === searchIndex ? true : charDetails.missed
        return {
            ...charDetails,
            missed: missed,
        }
    })
}

const wrapperClass = css`
    display: flex;
    flex-flow: column;
    justify-conent: center;
    align-items: center;
    border-radius: 5px;
    min-width: 700px;
    width: 80%;

    outline: none;
`

export default TypingContainer
