import Head from 'next/head'
import Image from 'next/image'
import Forge from "../components/forge"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Forge | AI Generated Marketing</title>
        <meta name="description" content="Generate branding snippets for your product." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Forge/>
    </div>
    
  )
}
