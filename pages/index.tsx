import type { NextPage } from 'next'
import Head from 'next/head'
import Home from '../src/components/home/home'

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>Import Export South Africa</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home/>
    </>
  )
}

export default Main
