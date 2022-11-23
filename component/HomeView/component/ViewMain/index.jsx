import styles from './index.module.css'
import Tag from '../../../Tag'

export default function ViewMain({ tags }) {
  return <div className={styles.viewMain}>
    {/* <img src="/img/favicon.png" alt="avatar" /> */}
    <img src="https://blog.qbb.sh/images/avatar.png" alt="avatar" />
    <div className={styles.wordBook}>
      <h4>Gunslinger</h4>
      <p>n. 枪手；带枪的歹徒</p>
    </div>
    <div className={styles.tagBox}>
      {tags.map(tag => <Tag key={tag.tag}>{tag.tag}</Tag>)}
    </div>
    <div className={styles.border}></div>
    {/* <div className={styles.tagBox}>
      <Tag>css</Tag>
      <Tag>运维</Tag>
      <Tag>js</Tag>
    </div> */}
  </div>
}