import Head from 'next/head';
import styles from './index.module.css'

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
        <article dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </main>
  </>
}