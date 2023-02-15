import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Game from '@/models/Game'
import {Phase} from '@/models/Phase'
import SelectPlayer from '@/components/Game/SelectPlayerComponent'
import TakeAShare from '@/components/Game/TakeAShareComponent'
import BuildRailroadTrack from '@/components/Game/BuildRailroadTrackComponent'
import RideTheRails from '@/components/Game/RideTheRailsComponent'
import Player from '@/models/Player'

export default function Home() {
  const [gamePage, setGamePage] = useState<JSX.Element>()
  const [phase, setPhase] = useState<Phase>(Phase.NewGame)
  const [round, setRound] = useState<number>(0)
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(3)
  const [players, setPlayers] = useState<Player[]>([])


  useEffect(() => {
    setPhase(Phase.NewGame)
    setRound(0)
  }, [])

  const onPlayerSelection = (playersSelected: Player[]) => {
    setPlayers(playersSelected)
    setNumberOfPlayers(playersSelected.length)
  }

  useEffect(() => {
    switch(phase){
      case Phase.NewGame:
        setGamePage(<SelectPlayer onPlayerSelection={onPlayerSelection}/>)
        break;
      case Phase.TakeAShare:
        setRound(round+1)
        setGamePage(<TakeAShare/>)
        break;
      case Phase.BuildRailroadTrack:
        setGamePage(<BuildRailroadTrack/>)
        break;
      case Phase.RideTheRails:
        setGamePage(<RideTheRails/>)
        break;
    }
  }, [phase])
  
  return (
    <>
    {
      gamePage
    }
    <div>
      {numberOfPlayers}
    </div>
    </>
  )
}
