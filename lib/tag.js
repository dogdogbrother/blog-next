import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'docs');

export function getTag() {
  const mds = fs.readdirSync(docsDirectory).filter(dir => dir.includes('.md'))
  const tagsRes = {}
  // 无家可归的文章们
  const dosser = []
  mds.forEach(mdPath => {
    const slug = mdPath.replace(/\.md$/, '');
    const fullPath = join(docsDirectory, mdPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data = {} } = matter(fileContents);
    const { tags = '' } = data
    tags.split(' ').forEach(tag => {
      // 有tag就划分标签,没有算在未分类下
      if (!tag) return dosser.push(slug)
      if (tagsRes[tag]) {
        tagsRes[tag].num++
        tagsRes[tag].article.push(slug)
      } else tagsRes[tag] = {
        num: 1,
        article: [slug]
      }
    })
  })
  const returnRes = Object.entries(tagsRes).map(([key, value]) => {
    return {
      tag: key,
      ...value
    }
  })
  if (dosser.length) {
    returnRes.push({
      tag: dosser.length,
      num: dosser.length,
      article: dosser
    })
  }
  return returnRes
}