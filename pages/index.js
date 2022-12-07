import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import HomeView from '../component/HomeView'
import { MdiTagMultiple, MdiFolderOpen } from '../public/svg'
import Tag from '../component/Tag'
import { useRouter } from 'next/router'
import docsInfo from '../lib/docs'

export default function Home({tags, books, articles}) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>森林的博客</title>
        <meta name="description" content="记录下日常 写写所得" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView tags={tags} books={books} />
      <section className={styles.content} id="content">
        <ul className={styles.articleList}>
          {
            articles.map(article => <Link
              target='_blank'
              href={article.slug.replace('/', '-path-')}
              key={article.slug}
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
            </Link>)
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
              {
                books.map(book => <li key={book.book}>{book.book}</li>)
              }
            </ul>
          </div>
        </div>
      </section>
      <div className={styles.rootBg}></div>
    </div>
  )
}

export function getStaticProps() {
  const tags = docsInfo.getTag()
  const books = docsInfo.getBook()
  const articles = docsInfo.getArticle()
  return {
    props: {
      tags,
      books,
      articles
    }
  };
}
