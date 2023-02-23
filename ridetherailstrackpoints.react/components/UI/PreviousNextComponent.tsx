import { useEffect, useState } from "react"

type PreviousNextComponentType = {
    hasPrevious: boolean
    hasNext: boolean
    onPreviousClick: (...props: any) => any
    onNextClick: (...props: any) => any
}

export default function PreviousNextComponent({hasPrevious, hasNext, onPreviousClick, onNextClick} : PreviousNextComponentType) {
    const [className, setClassName] = useState<string>('flex flex-row min-w-screen max-w-screen')

    //Sets the correct classes list 
    useEffect(() => {
        const defaultButtonsClassName = 'flex flex-row min-w-screen max-w-screen'
        const moreClassNames = hasNext && hasPrevious
            ? ' justify-between'
            : hasNext
                ? ' justify-end'
                : ' justify-start'
        setClassName(defaultButtonsClassName + moreClassNames)
    }, [hasPrevious, hasNext])
    
    return (
        <>
        <div className={className}>
                {
                    hasPrevious && <button className="px-20 pb-10" onClick={onPreviousClick}>PREVIOUS</button>
                }
                {
                    hasNext && <button className="px-20 pb-10" onClick={onNextClick}>NEXT</button>
                }
            </div>
        </>
    )
}