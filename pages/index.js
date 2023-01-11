import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import HomeView from '../component/HomeView'
import { MdiTagMultiple, MdiFolderOpen } from '../public/svg'
import Tag from '../component/Tag'
import docsInfo from '../lib/docs'
import markdownToTxt from 'markdown-to-txt'
import { useState, useEffect } from 'react'
export default function Home({tags, books, articles }) {
  const [_tags, _setTag] = useState([])
  const [_books, _setbook] = useState([])
  const [_viewBooks, setViewBook] = useState(articles)
  function setTag(tag, type) {
    console.log(type);
    if (type === 'book') {
      _setTag([])
      if (!_books.includes(tag)) {
        _setbook([..._books, tag])
      }
    }
    if (type === 'tag') {
      _setbook([])
      if (!_tags.includes(tag)) {
        _setTag([..._tags, tag])
      }
    }
    const contentDom = document.getElementById('content')
    contentDom.scrollIntoView({block: 'start', behavior: 'smooth'})
  }
  const _setTagFn = tag => () => {
    setTag(tag, 'tag')
  }
  useEffect(() => {
    if (_tags.length) {
      setViewBook(articles.filter(({ tags }) => {
        let findFlag = false
        // 如果 article.tags 和 _tags 有重叠 就显示
        _tags.forEach(item => {
          if (tags.includes(item)) {
            findFlag = true
          }
        })
        return findFlag
      }))
    } else if (_books.length) {
      setViewBook(articles.filter(({ book }) => {
        let findFlag = false
        // 如果 article.tags 和 _tags 有重叠 就显示
        _books.forEach(item => {
          if (book === item) {
            findFlag = true
          }
        })
        return findFlag
      }))
    } else setViewBook(articles)
  }, [_tags, _books])
  function getHasTag(arr1, arr2) {
    if (arr1.length) return arr1
    return arr2
  }
  return (
    <div>
      <Head>
        <title>森林的博客</title>
        <meta name="description" content="记录下日常 写写所得" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView tags={tags} books={books} setTag={setTag} />
      <section className={styles.content} id="content">
        <ul className={styles.articleList}>
          {
            !!(_tags.length || _books.length) && <div className={styles.currentTagbox}>
              {
                getHasTag(_tags, _books).map(tag => <Tag>{tag}</Tag>)
              }
            </div>
          }
          {
            _viewBooks.map(article => <Link
              target='_blank'
              href={article.slug.replace('/', '-path-')}
              key={article.slug}
            >
              <div>
                <h3>{article.title}</h3>
                <div className={styles.description}>
                  <div>
                    <span className={styles.label}>专栏:</span>
                    <tag>{article.dir}</tag>
                  </div>
                  <div className={styles.tagWrap}>
                    <span className={styles.label}>标签:</span>
                    {
                      article.tags.map(tag => <tag key={tag}>{tag}</tag>)
                    }
                  </div>
                </div>
              </div>
              <div className={styles.listContent}>
                {markdownToTxt(article.content).substring(0, 200)}
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
              {tags.map(tag => <Tag onClick={_setTagFn(tag.tag)} key={tag.tag}>{tag.tag}</Tag>)}
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
  }
}