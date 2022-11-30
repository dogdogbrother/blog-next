import styles from './index.module.css'
import NavHeader from './component/NavHeader'
import ViewMain from './component/ViewMain'
import { MdiChevronDown } from '../../public/svg/index'

export default function HomeView({ tags, books }) {
  function toContent() {
    const contentDom = document.getElementById('content')
    contentDom.scrollIntoView({block: 'start', behavior: 'smooth'})
  }
  return <section className={styles.homeView}>
    <NavHeader />
    <ViewMain tags={tags} books={books} />
    <MdiChevronDown className={styles.downIcon} onClick={toContent} />
  </section>
}