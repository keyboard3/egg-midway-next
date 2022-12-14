import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const Home: NextPage = ({ users }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">用户列表</a>
        </h1>
        {
          users.map(item => <div key={item.id} className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>姓名: {item.name}</h2>
              <p>工作: {item.jobs.join(",")}</p>
            </a>
          </div>)
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
  const response = await global.serverFetch('http://127.0.0.1/api/users');
  return {
    props: { users: response.json().data }, // will be passed to the page component as props
  }
}