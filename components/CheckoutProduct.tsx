import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'
function CheckoutProduct({
    id, 
    title,
    price, 
    rating,
    description, 
    category, 
    image, 
    hasPrime}: any) {
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        const product = {
            id, 
            title,
            price, 
            rating,
            description, 
            category, 
            image, 
            hasPrime
        }
        dispatch(addToBasket(product))
    }
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }
    return (
    <div className='grid grid-cols-5'>
        {/* Left */}
        <Image src={image} height={200} width={200} alt={''} />

        {/* Middle */}
        <div className='col-span-3 mx-5'>
            <p>{title}</p>
            <div className='flex'>
                {Array(rating)
                .fill(rating)
                .map((_,i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </div>
            <p className='text-xs mt-2 my-2 line-clamp-3'>
                {description}    
            </p>
            £{price}
            {hasPrime && (
                <div className='flex items-center space-x-2'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>FREE Next's delivery</p>
                </div>
            )}
        </div>
        {/* Right add/remove button */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button' onClick={addItemToBasket}>
                Add to Basket    
            </button>
            <button className='button' onClick={removeItemFromBasket}>
                Remove from Basket
            </button>
        </div>
    </div>
  )
}

export default CheckoutProduct