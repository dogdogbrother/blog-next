import styles from './index.module.scss'
import * as THREE from 'three'
import BIRDS from 'vanta/dist/vanta.birds.min'
import { useEffect, useRef, useState } from 'react'

export default function VantaBg() {
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: myRef.current,
        THREE: THREE
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return <div className={styles.vantaBg} ref={myRef}></div>
} 