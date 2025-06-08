import React from 'react'
import Banner from '../banner/Banner'
import BRURSection from '@/app/about/page'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <br/>
        <h1 className='text-blue-800 text-center text-6xl p-4'> <span className='p-2 text-red-500'>About OF</span>
            <br/> Begum Rokeya University, Rangpur.</h1>
        <BRURSection></BRURSection>


    </div>
  )
}

export default Home

