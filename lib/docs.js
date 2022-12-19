import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { getFullDoc, rootDirectory } from '../util/getFullDoc'

class DocsInfo {
  // 把装着图片的 img 文件排除
  #fullDoc = getFullDoc().filter(file => file !== 'img')
  tas = []
  book = []
  aticle = []
  #tagsRes = {}
  #dosser = []
  #bookRes = {} 
  constructor() {
    // 对文档遍历  拿到里面的 tag 和 book 和 title 等一系列信息
    this.#fullDoc.forEach(doc => {
      const {  
        content,
        ..._doc // 包含 dir目录名 name文件名 slug目录/文件名
      } = doc
      const { data = {} } = matter(content)
      const { tags = '', book } = data
      this.#setTag(tags.split(' '), _doc)
      this.#setBook(book, _doc)
    })
  }
  #setTag(tags, doc) {
    tags.forEach(tag => {
      // 有tag就划分标签,没有算在未分类下
      if (!tag) return this.#dosser.push(doc)
      if (this.#tagsRes[tag]) {
        this.#tagsRes[tag].num++
        this.#tagsRes[tag].article.push(doc)
      } else this.#tagsRes[tag] = {
        num: 1,
        article: [doc]
      }
    })
  }
  #setBook(book, doc) {
    if(!book) return
    if (this.#bookRes[book]) {
      this.#bookRes[book].num++
      this.#bookRes[book].article.push(doc)
    } else this.#bookRes[book] = {
      num: 1,
      article: [doc]
    }
  }
  // 把tag的2个数据整合成数组返回去
  getTag() {
    const returnRes = Object.entries(this.#tagsRes).map(([tag, value]) => ({tag, ...value}))
    if (this.#dosser.length) {
      // 如果有丢失的文章 就添加个新的tag 显示 1 2 3 4 这样的
      returnRes.push({
        tag: this.#dosser.length,
        num: this.#dosser.length,
        article: this.#dosser
      })
    }
    return returnRes
  }
  getBook() {
    return Object.entries(this.#bookRes).map(([book, value]) => ({book, ...value}))
  }
  getArticle() {
    return this.#fullDoc.map(doc => {
      const {  
        content: _content,
        ..._doc // 包含 dir目录名 name文件名 slug目录/文件名
      } = doc
      const { data = {}, content } = matter(_content)
      return {
        ..._doc,
        ...data,
        content,
        tags: data.tags ? data.tags.split(' ') : []
      }
    })
  }
  getDocByFilePath(slug) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(rootDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug: realSlug, meta: data, content };
  }
}

export default new DocsInfo()
