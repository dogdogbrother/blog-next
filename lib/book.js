import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'docs');

export function getBook() {
  const mds = fs.readdirSync(docsDirectory).filter(dir => dir.includes('.md'))
  const bookRes = {}  // 装着合计的结果
  mds.forEach(mdPath => {
    const slug = mdPath.replace(/\.md$/, '')
    const fullPath = join(docsDirectory, mdPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data = {} } = matter(fileContents)
    const { book } = data
    if (!book) return
    if (bookRes[book]) {
      bookRes[book].num++
      bookRes[book].article.push(slug)
    } else bookRes[book] = {
      num: 1,
      article: [slug]
    }
  })
  const returnRes = Object.entries(bookRes).map(([key, value]) => {
    return {
      book: key,
      ...value
    }
  })
  return returnRes
}