import type { NextPage } from 'next'
import Head from 'next/head'
import Example from '../components/Example'
import Image from 'next/image'
import bgImage from '../public/bg.jpg'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>佐玩前端React面试</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 w-full h-full">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          quality={100}
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <Example />
    </>
  )
}

export default Home
