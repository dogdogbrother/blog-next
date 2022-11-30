import { getAllDocs, getDocBySlug } from '../lib/docs';
import markdownToHtml from '../lib/markdown';
import Head from 'next/head';
import MdView from '../component/MdView'

export default function Doc({ _meta, content }) {
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
  return 
}

export async function getStaticProps({ params }) {
  const doc = getDocBySlug(params.slug)
  const content = await markdownToHtml(doc.content || '');
  return {
    props: {
      ...doc,
      content
    }
  };
}

export async function getStaticPaths() {
  const docs = getAllDocs();
  return {
    paths: docs.map(doc => ({
      params: {
        slug: doc.slug
      }
    })),
    fallback: 'blocking'
  }
}