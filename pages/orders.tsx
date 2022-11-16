import { doc, setDoc, getDocs ,collection, getDoc } from 'firebase/firestore/lite'
import { query, orderBy } from "firebase/firestore/lite"; 
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import Header from '../components/Header'
import db from '../firebase'
import moment from 'moment';
import Order from '../components/Order';

function Orders({orders}:any) {
  const { data: session } = useSession()
  console.log(orders)
  return (
    <div>
        <Header />
        <main className='max-w-screen-lg mx-auto p-10'>
          <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
            Your orders
          </h1>
          {session ? (
            <h2>{orders.length} Orders</h2>
          ) : (
            <h2>Please sign in to see your orders</h2>
          )}

          <div className='mt-5 space-y-4'>
            {orders?.map( ({id, amount, amountShipping, items, timestamp, images}:any) => (
              <Order
              key={id}
              id={id}
              amount={amount}
              amountShipping={amountShipping}
              items={items}
              timestamp={timestamp}
              images={images}
              />
            ))}
          </div>
        </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context : any) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  //Get the users logged in credentials..
  const session = await getSession(context)
  if(!session){
    return {
      props: {},
    }
  }

  //firebase database
  const ref = collection(db, "users", session.user.email, "orders")

  const q = query(ref, orderBy('timestamp', 'desc'))
  const stripeOrders = await getDocs(q)

  //Stripe orders 
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data,

    }))
  )

  return {
    props: {
      orders,
    }
  }
}


