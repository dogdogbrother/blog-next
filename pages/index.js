import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomeView from '../component/HomeView'
import { MdiTagMultiple, MdiFolderOpen } from '../public/svg'
import Tag from '../component/Tag'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>森林的博客</title>
        <meta name="description" content="记录下日常 写写所得" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView />
      <section className={styles.content} id="content">
        <ul className={styles.articleList}>
          <li>
            <div>
              <h3>js基础</h3>
              <p>
                我是一些描述
              </p>
            </div>
            <div>
              我是内容是内容是内容
            </div>
          </li>
          <li>
            <div>
              <h3>js基础</h3>
              <p>
                我是一些描述
              </p>
            </div>
            <div>
              我是内容是内容是内容
            </div>
          </li>
        </ul>
        <div className={styles.aside}>
          <div className={styles.tagBox}>
            <h2>
              <MdiTagMultiple />
              标签大集合
            </h2>
            <div>
              <Tag>css</Tag>
              <Tag>运维</Tag>
              <Tag>js</Tag>
              <Tag>数据库</Tag>
            </div>
          </div>
          <div className={styles.tagBox}>
            <h2>
              <MdiFolderOpen />
              文章专栏
            </h2>
            <ul>
              <li>electron开发实录</li>
              <li>nextjs</li>
            </ul>
          </div>
        </div>
      </section>
      <div className={styles.rootBg}></div>
    </div>
  )
}
