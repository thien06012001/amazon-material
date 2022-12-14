import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
function Product({id, title,price, description, category, image}: any) {
    const dispatch = useDispatch()
    const MAX_RATINGS = 5;
    const MIN_RATINGS = 1;
    const RANDOM = Math.floor(Math.random() * (MAX_RATINGS - MIN_RATINGS +1)) + MIN_RATINGS
    const [rating,setRating] = useState(RANDOM)
    const [hasPrime] = useState(Math.random() < 0.5)
    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price, 
            rating,
            description, 
            category, 
            image,
            hasPrime,
        }
        //Sending the product as an action to the REDUX store.. basketSlice
        dispatch(addToBasket(product))
    }
    return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
        <Image object-fit='contain' className='p-auto m-auto' src={image} height={200} width={200} alt={''}/>
        <h4 className='my-3'>{title}</h4>
        <div className='flex'>
            {Array(rating)
            .fill(rating)
            .map((_,i) => (
                 <StarIcon className='h-5 text-yellow-500' />
                )   
            )}
            
        </div>
        <p className='text-xs my-2 line-clamp-2'>{description}</p>
        <div className='mb-5'>
            £{price}
        </div>
        {hasPrime && (
            <div className='flex items-center space-x-2 -mt-5'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>
        )}

        <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
    </div>
  )
}

export default Product