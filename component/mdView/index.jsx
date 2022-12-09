import Head from 'next/head'
import styles from './index.module.css'
import MarkDown from 'markdown-to-jsx'
import Prism from 'prismjs'
export default function MdView({ content }) {
  return <>
    <Head>
      <link
        rel="preload"
        href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
        as="script"
      />
      <link
        rel="preload"
        href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
        as="script"
      />
      <link
        rel="preload"
        href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
        as="script"
      />
      <link
        rel="preload"
        href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
        as="script"
      />
      <link
        href={`https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css`}
        rel="stylesheet"
      />
    </Head>
    <main className={styles.mkWrap}>
      <div className={styles.paper}>
        <MarkDown
        //把 ](/img/ 替换成本机文本的绝对路径
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
        {/* <article dangerouslySetInnerHTML={{ __html: content }} /> */}
      </div>
    </main>
  </>
}

function Code({className, children}) {
  if (className) {
    const newLanguage = className.replace("lang-", "language-");
    const type = newLanguage.split('language-')[1]
    return <code 
      className={className}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(children, Prism.languages[type], type)
      }}
    ></code>
  }
  return <code>{children}</code>
}