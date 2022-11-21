import styles from './index.module.css'

export default function Tag(props) {
  return <a className={styles.tag}>{props.children}</a>
}