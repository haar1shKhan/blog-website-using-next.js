import React from 'react'

const Banner = () => {
  return (
    <div className='bg-yellow-400 flex justify-between items-center max-w-7xl border-black border-y  p-10 lg:p-5 mx-auto'>
      
      <div>
        <h1 className='text-6xl  font-serif max-w-xl'><span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read, and connet</h1>
        <h2>Its easy and free to post your thinking at any topic and connect with million reader</h2>
      </div>
      
    <h1 className='hidden md:inline-flex text-9xl font-serif'>M</h1>

    </div>
  )
}

export default Banner
