import { h, Component } from 'preact'
import { css } from 'emotion'
import Key from './KeyboardKey'

const keyMap = {
    AlphaRowTop: [
        ['Q', 81],
        ['W', 87],
        ['E', 69],
        ['R', 82],
        ['T', 84],
        ['Y', 89],
        ['U', 85],
        ['I', 73],
        ['O', 79],
        ['P', 80],
    ],
    AlphaRowMiddle: [
        ['A', 65],
        ['S', 83],
        ['D', 68],
        ['F', 70],
        ['G', 71],
        ['H', 72],
        ['J', 74],
        ['K', 75],
        ['L', 76],
        [';', 186],
    ],
    AlphaRowBottom: [
        ['Z', 90],
        ['X', 88],
        ['C', 67],
        ['V', 86],
        ['B', 66],
        ['N', 78],
        ['M', 77],
        [',', 188],
        ['.', 190],
        ['/', 191],
    ],
}

type KeyboardProps = {
    keysPressed: string[]
}

export const Keyboard = (props: KeyboardProps) => {
    const { keysPressed } = props

    const isActive = (char: string) =>
        keysPressed.includes(char.toLowerCase()) || keysPressed.includes(char)

    return (
        <div className={wrapperClass}>
            <div className={topRowClass}>
                {keyMap.AlphaRowTop.map(key => {
                    const char = key[0] as string
                    return <Key label={char} isActive={isActive(char)} />
                })}
            </div>
            <div className={middleRowClass}>
                {keyMap.AlphaRowMiddle.map(key => {
                    const char = key[0] as string
                    return <Key label={char} isActive={isActive(char)} />
                })}
            </div>
            <div className={bottomRowClass}>
                {keyMap.AlphaRowBottom.map(key => {
                    const char = key[0] as string
                    return <Key label={char} isActive={isActive(char)} />
                })}
            </div>
        </div>
    )
}

const wrapperClass = css`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    outline: none;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        box-shadow: 3px 3px 15px #00888866;
    }
`
const row = css`
    display: flex;
    justify-content: flex-start;
`
const topRowClass = css`
    ${row}
`
const middleRowClass = css`
    ${row}
    margin-left: 30px;
`
const bottomRowClass = css`
    ${row}
    margin-left: 60px;
`
export default Keyboard
