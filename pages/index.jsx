import Head from "next/head";
import Image from "next/image";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import Banner from "../components/ui/Banner";
import { cmsClient } from "../lib/sanityClient";

export default function Home({ balls }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Golf Now</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        {/* <Banner /> */}

        <h1>Top Selling Products</h1>
        <div className={styles.topProductsContainer}>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            {/* <h1>top product</h1> */}
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>top product 2</h1>
          </Card>
        </div>

        <h1>Clubs</h1>
        <div className={styles.categoryTopContainer}>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
        </div>

        <h1>Balls</h1>
        <div className={styles.categoryTopContainer}>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
        </div>

        <h1>Shoes</h1>
        <div className={styles.categoryTopContainer}>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
        </div>

        <h1>Check Out These Other Products</h1>
        <div className={styles.categoryTopContainer}>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test1</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test2</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test3</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test4</h1>
          </Card>
          <Card>
            {/* <Image src="/" alt="pic" width={500} height={500} /> */}
            <h1>test5</h1>
          </Card>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const balls = await cmsClient.fetch('*[_type == "balls"]');
  console.log(
    "🚀 ~ file: index.jsx ~ line 110 ~ getServerSideProps ~ balls",
    balls
  );
  const clubs = await cmsClient.fetch('*[_type == "clubs"]');
  console.log(
    "🚀 ~ file: index.jsx ~ line 112 ~ getServerSideProps ~ clubs",
    clubs
  );
  const shoes = await cmsClient.fetch('*[_type == "shoes"]');
  console.log(
    "🚀 ~ file: index.jsx ~ line 114 ~ getServerSideProps ~ shoes",
    shoes
  );

  return {
    props: { balls, clubs, shoes },
  };
};
