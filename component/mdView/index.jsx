import styles from './index.module.css'
import MarkDown from 'markdown-to-jsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/themes//prism-okaidia.css'
import { useEffect, useState } from 'react'
const debounce = (func, delay) => {
  let timeout;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      func(...param);
    }, delay);
  }
}

export default function MdView({ content }) {
  const [domList, setDomList] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)

  const secrrol = h2List => debounce(() => {
    // 是否有h2标签在屏幕上方一小块区域
    const findIndex = h2List.findIndex(h2 => {
      const diff = window.scrollY - h2.offsetTop
      return diff < 20 && diff > -100
    })
    if (findIndex > -1) {
      return setActiveIndex(findIndex)
    }
    // 当前没有找到 就找下面最近的h2, index - 1后就是最近的上面的
    const nextLatelyIndex = h2List.findIndex(h2 => (h2.offsetTop - window.scrollY) > 220)
    if (nextLatelyIndex > 0) {
      return setActiveIndex(nextLatelyIndex - 1)
    }
  }, 150)
  useEffect(() => {
    const h2List = document.querySelectorAll('article h2') || []
    const _domList = Array.from(h2List)
    setDomList(_domList)
    secrrol(_domList)()
    window.addEventListener('scroll', secrrol(_domList))
  }, [])
  const changeActive = (index) => () => {
    domList[index].scrollIntoView({block: 'start', behavior: 'smooth'})
    setActiveIndex(index)
  }
  
  return <>
    <main className={styles.mkWrap}>
      <div className={styles.paper}>
        <MarkDown
          children={content}
          options={{ 
            forceBlock: true, 
            wrapper: 'article',
            overrides: {
              code: {
                component: Code
              }
            }
          }}
        ></MarkDown>
      </div>
      {
        domList && <ul className={styles.catalog}>
          {
            domList.map((title, index) => <li 
              key={index}
              onClick={changeActive(index)}
              className={activeIndex === index ? styles.active : ''}
              title={title.innerText}
            >
              {title.innerText}
            </li>)
          }
        </ul>
      }
    </main>
  </>
}

function Code({className, children}) {
  if (className) {
    const type = className.split('lang-')[1]
    return <code 
      className={className}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(children, Prism.languages[type], type)
      }}
    ></code>
  }
  return <code>{children}</code>
}