import styles from './index.module.css'
import NavHeader from './component/NavHeader'
import ViewMain from './component/ViewMain'
import { MdiChevronDown } from '../../public/svg/index'

export default function HomeView() {
  return <section className={styles.homeView}>
    <NavHeader />
    <ViewMain />
    <MdiChevronDown className={styles.downIcon} />
  </section>
}