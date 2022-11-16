import type {NextApiRequest, NextApiResponse} from 'next'

export default async (req:NextApiRequest, res:NextApiResponse) =>{
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const {items, email} = req.body
    const transformedItems = items.map((item:any) => ({    
        price_data: {  
            currency: 'gbp',
            unit_amount:item.price * 100,  
            product_data: {      
                name: item.title,
                description: item.description,
                images: [item.image]
            }
        },
        quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_options: [{shipping_rate: 'shr_1M4RT6LcQ5mTafT0Qc3pY0gf'}],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item:any) => item.image))
        }
    })
    res.status(200).json({id: session.id})
}


