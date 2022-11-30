import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'docs');

export function getTag() {
  const mds = fs.readdirSync(docsDirectory).filter(dir => dir.includes('.md'))
  const tagsRes = {}  // 装着标签的结果
  // 无家可归的文章们
  const dosser = []
  mds.forEach(mdPath => {
    const slug = mdPath.replace(/\.md$/, '')
    const fullPath = join(docsDirectory, mdPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data = {} } = matter(fileContents)
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
    // 如果有丢失的文章 就添加个新的tag 显示 1 2 3 4 这样的
    returnRes.push({
      tag: dosser.length,
      num: dosser.length,
      article: dosser
    })
  }
  return returnRes
}