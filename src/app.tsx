import { h, Component } from 'preact'
import { css } from 'emotion'
import { TypingContainer } from './components/TypingContainer'
import { GithubCorner } from './components/GithubCorner'

export const App = () => {
    return (
        <div>
            <GithubCorner
                link="https://github.com/EnglishAW/typing-trainer"
                fill="#64CEAA"
                logoColor="#292d3f"
            />
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
        </div>
    )
}
