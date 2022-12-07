import markdownToHtml from '../lib/markdown'
import Head from 'next/head'
import MdView from '../component/MdView'
import docsInfo from '../lib/docs'

export default function Doc({ meta, content }) {
  return <>
    <Head>
      {/* <link
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
      /> */}
      <link
        href={`https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css`}
        rel="stylesheet"
      />
    </Head>
    <MdView content={content} />
  </>
}

export async function getStaticProps({ params }) {
  const doc = docsInfo.getDocByFilePath(params.slug.replace('-path-', '/'))
  const content = await markdownToHtml(doc.content || '');
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