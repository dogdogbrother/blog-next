import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomeView from '../component/HomeView'
import { MdiTagMultiple, MdiFolderOpen } from '../public/svg'
import Tag from '../component/Tag'
import { getTag } from '../lib/tag'
import { getArticle } from '../lib/aticle'
import { useRouter } from 'next/router'

export default function Home({tags, articles}) {
  const router = useRouter()
  const toDoc = (docPath) => () => {
    router.push(docPath)
  }
  return (
    <div>
      <Head>
        <title>森林的博客</title>
        <meta name="description" content="记录下日常 写写所得" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView tags={tags} />
      <section className={styles.content} id="content">
        <ul className={styles.articleList}>
          {
            articles.map(article => <li 
              key={article.slug}
              onClick={toDoc(article.slug)}
            >
              <div>
                <h3>{article.title}</h3>
                <p>
                  我是一些描述
                </p>
              </div>
              <div>
                我是内容是内容是内容
              </div>
            </li>)
          }
        </ul>
        <div className={styles.aside}>
          <div className={styles.tagBox}>
            <h2>
              <MdiTagMultiple />
              标签大集合
            </h2>
            <div>
              {tags.map(tag => <Tag key={tag.tag}>{tag.tag}</Tag>)}
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

export function getStaticProps() {
  const tags = getTag()
  const articles = getArticle()
  return {
    props: {
      tags,
      articles
    }
  };
}
