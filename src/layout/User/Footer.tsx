import React from 'react'

 const Footer = () => {
  return (
    <div className='container-xl'>
      <div className='border border-solid w-full h-[0.2px]'/>
      <div className='my-4 flex items-center'>
        <div className='flex justify-start w-1/2'>
          <p className='mr-4'>English</p>
          <p>VietNamese</p>
        </div>
        <div className='flex justify-end w-1/2'>
          <p>Non Copyrighted © 2024 Upload by MegaUp</p>
        </div>
      </div>
    </div>
  )
}
export default Footer