import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Game from '@/models/Game'
import {Phase} from '@/models/Phase'
import Player from '@/models/Player'
import Link from 'next/link'

export default function Home() {
  
  
  return (
    <>
    <div className='flex flex-col flex-wrap items-center justify-center min-h-screen'>
      <Link href='/game/select-player'>PLAY!</Link>
    </div>
    </>
  )
}
