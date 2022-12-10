import Head from 'next/head'
import MdView from '../component/MdView/index.jsx'
import docsInfo from '../lib/docs'

export default function Doc({ meta, content }) {
  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <MdView content={content} />
  </>
}

export async function getStaticProps({ params }) {
  const { content, ...doc } = docsInfo.getDocByFilePath(params.slug.replace('-path-', '/'))
  return {
    props: {
      ...doc,
      content
    }
  };
}

export function getStaticPaths() {
  const docs = docsInfo.getArticle();
  return {
    paths: docs.map(doc => ({
      params: {
        slug: doc.slug.replace('/', '-path-')
      }
    })),
    fallback: 'blocking'
  }
}