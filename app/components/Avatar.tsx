'use client'
import React from 'react'
import Image from 'next/image'
import avatar from '../../public/images/placeholder.jpg'
const Avatar = () => {
  return (
    <Image alt='avatar'  className='rounded-full' height='30' width='30' src={avatar} />
  )
}

export default Avatar