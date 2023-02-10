import styles from './index.module.scss'
// const colors = [
//   ['#2C73D2', '#0089BA'],
//   ['#845EC2', '#D65DB1'],
//   ['#FF6F91', '#FF9671'],
//   ['#FFC75F', '#F9F871'],
//   ['#5EC1C2', '#75DFAE'],
//   ['#5EC1C2', '#75DFAE'],
//   ['#99EB9A', '#F9F871'],
//   ['#C2815E', '#B56C6E'],
//   ['#98607B', '#705A7C'],
//   ['#C25E70', '#A55980'],
//   ['#805885', '#5B567F'],
//   ['#C55033', '#FF8563'],
//   ['#917200', '#008DCE'],
//   ['#8F5EC2', '#009EFD'],
//   ['#326279', '#4498BD'],
//   ['#4498BD', '#B2C7D4'],
// ]
export default function Tag(props) {
  // const [leftColor, rightColor] = colors[Math.floor(Math.random() * colors.length)]
  return <a 
    onClick={props.onClick}
    className={styles.tag}
  >{props.children}</a>
}