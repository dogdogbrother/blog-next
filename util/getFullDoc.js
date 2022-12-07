import fs from 'fs';
import { join } from 'path';

export const rootDirectory = join(process.cwd(), 'docs');
// 获取到全部的文档已经文件夹下的文档,把文件信息加工后返给外面
export function getFullDoc() {
  const docs = []
  const rootFiles = fs.readdirSync(rootDirectory)
  rootFiles.forEach(rootFile => {
    const filePath = join(rootDirectory, rootFile)
    // 如果文档是以 md结尾 的
    if (rootFile.includes('.md')) {
      const name = rootFile.replace(/\.md$/, '')
      const content = fs.readFileSync(filePath, 'utf8')
      docs.push({
        slug: name,
        name,
        content
      })
    } else {
      const stats = fs.statSync(filePath)
      // 如果是文件夹 遍历文件夹下的内容
      if (!stats.isFile() && rootFile !=='img') {
        const mdfiles = fs.readdirSync(filePath, 'utf8').filter(file => file.includes('.md'))
        mdfiles.forEach(file => {
          const name = file.replace(/\.md$/, '')
          const content = fs.readFileSync(join(filePath, file), 'utf8')
          docs.push({
            slug: rootFile + '/' + name,
            name,
            content,
            dir: rootFile
          })
        })
      }
    }
  })
  return docs
}


