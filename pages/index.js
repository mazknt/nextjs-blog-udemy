import Link from "next/link";
import Head from "next/head";
import { Layout, siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";
import style from "../styles/Home.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  // console.log("いえあ");
  // console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>我々は宇宙人だ</p>
      </section>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>エンジニアのブログ</h2>
        <div className={style.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  className={style.thumbnailImage}
                  src={thumbnail}
                  alt="記事"
                />
              </Link>
              <Link className={utilStyle.boldText} href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
