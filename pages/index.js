import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomeView from '../component/HomeView'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>森林的博客</title>
        <meta name="description" content="记录下日常 写写所得" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomeView />
      </main>
    </div>
  )
}
