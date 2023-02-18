import PlayerInterface from "@/interfaces/PlayerInterface";
import LocalStorageUtility from "@/utilities/storageUtility";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const TakeAShare: NextPage = () => {
    const [players, setPlayers] = useState<PlayerInterface[]>()
    const [round, setRound] = useState<number>()


    useEffect(() => {
        setPlayers(LocalStorageUtility.read(LocalStorageUtility.playersKey))
        setRound(LocalStorageUtility.read(LocalStorageUtility.roundKey))
    }, [])

    return (
        <>
        {players?.map(p => <div>{p.name}</div>)}
        <div>ROBEEE</div>
        </>
    )
}

export default TakeAShare