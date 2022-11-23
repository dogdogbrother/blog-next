import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'docs');

export function getArticle() {
  const mds = fs.readdirSync(docsDirectory).filter(dir => dir.includes('.md'))
  return mds.map(mdPath => {
    const slug = mdPath.replace(/\.md$/, '')
    const fullPath = join(docsDirectory, mdPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data = {}, content } = matter(fileContents)
    return {
      ...data,
      content,
      slug
    }
  }).filter(md => md.title)
  
}