import { NextPage } from "next";
import { useEffect, useState } from "react";

const Morse: NextPage = () => {
    const [written, setWritten] = useState<string>()
    const [reversed, setReversed] = useState<string>()
    
    useEffect(() => {
        setReversed(reverse(written ?? ''))
    }, [written])
    
    const onChange = (e: any) => {
        e.preventDefault()
        const value = (e.currentTarget.value as string).toUpperCase()

        if(/^(.*[cjzCJZ].*)*$/.test(value)){
            console.error('NON VA BENE')
            e.currentTarget.value = written
            return
        }
        
        e.currentTarget.value = value
        setWritten(value)
    }

    const reverse = (text: string) => {
        const n = text.length

        let rev = ''
        for(let i = 0; i < n; i++){
            rev += reversedChar(text.charAt(i))
        }

        return rev
    }

    const reversedChar = (character: string) => {
        if(character.length !== 1) return ''
        if(character === 'A') return 'N'
        if(character === 'B') return 'V'
        if(character === 'D') return 'U'
        if(character === 'E') return 'E'
        if(character === 'F') return 'L'
        if(character === 'G') return 'W'
        if(character === 'H') return 'H'
        if(character === 'I') return 'I'
        if(character === 'K') return 'K'
        if(character === 'L') return 'F'
        if(character === 'M') return 'M'
        if(character === 'N') return 'A'
        if(character === 'O') return 'O'
        if(character === 'P') return 'P'
        if(character === 'Q') return 'Y'
        if(character === 'R') return 'R'
        if(character === 'S') return 'S'
        if(character === 'T') return 'T'
        if(character === 'U') return 'D'
        if(character === 'V') return 'B'
        if(character === 'W') return 'G'
        if(character === 'X') return 'X'
        if(character === 'Y') return 'Q'
    }
    
    return (
        <>
        <div className="flex flex-row justify-evenly">
            <div className="flex flex-col justify-center content-center">
                <div>Non inserire C J Z e spazi</div>
                <input type="text" onChange={onChange}></input>
                <div>Written: {written}</div>
                <div>Reverse: {reversed}</div>
            </div>
            <ul className="flex flex-col justify-center content-center">
                <li className="flex flex-row content-center justify-center">
                    <span>A</span> <span className="pl-2 pr-2">-</span> <span>N</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>B</span> <span className="pl-2 pr-2">-</span> <span>V</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>D</span> <span className="pl-2 pr-2">-</span> <span>U</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>E</span> <span className="pl-2 pr-2">-</span> <span>E</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>F</span> <span className="pl-2 pr-2">-</span> <span>L</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>G</span> <span className="pl-2 pr-2">-</span> <span>W</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>H</span> <span className="pl-2 pr-2">-</span> <span>H</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>I</span> <span className="pl-2 pr-2">-</span> <span>I</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>K</span> <span className="pl-2 pr-2">-</span> <span>K</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>L</span> <span className="pl-2 pr-2">-</span> <span>F</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>M</span> <span className="pl-2 pr-2">-</span> <span>M</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>N</span> <span className="pl-2 pr-2">-</span> <span>A</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>O</span> <span className="pl-2 pr-2">-</span> <span>O</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>P</span> <span className="pl-2 pr-2">-</span> <span>P</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>Q</span> <span className="pl-2 pr-2">-</span> <span>Y</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>R</span> <span className="pl-2 pr-2">-</span> <span>R</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>S</span> <span className="pl-2 pr-2">-</span> <span>S</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>T</span> <span className="pl-2 pr-2">-</span> <span>T</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>U</span> <span className="pl-2 pr-2">-</span> <span>D</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>V</span> <span className="pl-2 pr-2">-</span> <span>B</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>W</span> <span className="pl-2 pr-2">-</span> <span>G</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>X</span> <span className="pl-2 pr-2">-</span> <span>X</span>
                </li>
                <li className="flex flex-row content-center justify-center">
                    <span>Y</span> <span className="pl-2 pr-2">-</span> <span>Q</span>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Morse