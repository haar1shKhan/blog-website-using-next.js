import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
   <header className='flex justify-between max-w-7xl p-5 mx-auto'>
        <div className='flex items-center space-x-5'>

           <Link href='/'>

              <img src='https://links.papareact.com/yvf' height={'150px'} width={'150px'}/>

            </Link>

            <div className='hidden md:inline-flex space-x-5 items-center '>
                <h3>About</h3>
                <h3>Contact</h3>
                <h3 className='text-white bg-green-600 px-4 py-1 rounded-full  '>follow</h3>
            </div>

        </div>

        <div className='flex text-green-600 space-x-5 items-center'>
            <h3>Sign in</h3>
            <h3 className='border-green-600 border px-4 py-1 rounded-full'>Get Started</h3>
        </div>

   </header>
  )
}

export default Header
