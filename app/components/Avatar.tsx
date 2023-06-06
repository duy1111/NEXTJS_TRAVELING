'use client'
import React from 'react'
import Image from 'next/image'
import avatar from '../../public/images/placeholder.jpg'
interface AvatarProps {
  src : string | null | undefined
};
const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image alt='avatar'  className='rounded-full' height='30' width='30' src={src || avatar} />
  )
}

export default Avatar