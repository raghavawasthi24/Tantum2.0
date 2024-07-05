import React from 'react'
import BasicDetails from './basic-details'
import ImageUpload from '@/components/shared/AvatarSelector'

export default function Page() {
  return (
    <div className='flex flex-col md:flex-row items-center w-full min-h-[90vh] gap-6'>
       <ImageUpload />
       <BasicDetails />
    </div>
  )
}
