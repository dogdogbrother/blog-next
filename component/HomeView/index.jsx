import styles from './index.module.scss'
import NavHeader from './component/NavHeader'
import ViewMain from './component/ViewMain'
import { MdiChevronDown } from '../../public/svg/index'
import * as THREE from 'three'
import CLOUDES from 'vanta/dist/vanta.clouds.min'
import { useEffect, useRef, useState } from 'react'

export default function HomeView({ tags, books, setTag }) {
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(CLOUDES({
        el: myRef.current,
        THREE: THREE
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  function toContent() {
    const contentDom = document.getElementById('content')
    contentDom.scrollIntoView({block: 'start', behavior: 'smooth'})
  }
  return <section className={styles.homeView} ref={myRef}>
    <NavHeader />
    <ViewMain tags={tags} books={books} setTag={setTag} />
    <MdiChevronDown className={styles.downIcon} onClick={toContent} />
  </section>
}