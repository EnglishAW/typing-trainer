import { h, Component } from 'preact'
import { css } from 'emotion'
import { TypingContainer } from './components/TypingContainer'

export const App = () => {
    return (
        <div
            className={css`
                display: flex;
                flex-flow: column;
                justify-conent: center;
                align-items: center;
            `}
        >
            <h1>Simple Typing Tutor</h1>
            <TypingContainer />
        </div>
    )
}
