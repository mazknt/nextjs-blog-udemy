import Head from "next/head";
import Link from "next/link";
import React from "react";
export default function FirstPost() {
  return (
    // ページの内容を定義
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <h1>this is the first post</h1>
      <h2>
        <Link href="/">Home</Link>
      </h2>
    </div>
  );
}
