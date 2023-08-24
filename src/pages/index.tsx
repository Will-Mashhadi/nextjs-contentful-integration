import { IBlogPostFields } from "@/@types/contentful";
import ContentService from "@/util/content-service";
import { NextPage } from "next";
import Head from "next/head";

interface Props {
  articles: IBlogPostFields[];
}

const Home: NextPage<Props> = ({ articles }) => (
  <div >
    <Head>
      <title>My blog</title>
      <meta
        name="description"
        content="This is a blog with many interesting articles."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Welcome to my blog!</h1>

      <p >
        This is a blog with many interesting articles about all sorts of topics.
      </p>

      <div >
        {articles.map((article, index) => (
          <a
            key={article.title}
            href={`/${article.slug}`}
          > 
          {/* <img src={article.images[0].fields.file} alt="" /> */}
            <h2>{article.title} &rarr;</h2>
            {/* Should use <Image> instead of img to remove warning */}
            <img src={article.images[0].fields.file?.url}></img>
          </a>
        ))}
      </div>
    </main>
  </div>
);

export default Home;



export async function getStaticProps() {

  
  const articles = (
    await ContentService.instance.getEntriesByType("blogPost")
  ).map((entry) => entry.fields);

  console.log(articles)
  return {
    props: {
      articles,
    },
  };
};