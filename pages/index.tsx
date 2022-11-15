import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'

const Home: NextPage = ({products}:any) => {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Header */}
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />
        {/* ProductFeed */}
        <ProductFeed products={products}/> 
        
      </main>
    </div>
  )
}

export default Home
export async function getServerSideProps(context : any) {
  const products = await fetch('https://fakestoreapi.com/products').then(res=>res.json())
  return {
      props: {
          products
      },
  }
}