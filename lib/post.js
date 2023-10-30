import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import { html } from "remark-html";

//パス
const postsDirectory = path.join(process.cwd(), "posts");

//.mdのデータを取得する
export function getPostsData() {
  //オブジェクトの配列
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); //ファイル名をidとして使用する

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    //idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostData;
}

//getStaticPathでreturnで使うPathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

//idをもとにブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContent);
  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();
  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
