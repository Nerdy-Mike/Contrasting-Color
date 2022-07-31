import type { NextPage } from 'next'
import { userAgent } from 'next/server';
import { useEffect, useState } from 'react'
import contrastingColour from '../utils/color';

const Home: NextPage = () => {
  const [inputColor, setInputColor] = useState('');
  const [outputColor, setOutputColor] = useState('');

  const handleClick = () => {
    if(inputColor.length !== 6) {
      alert('Please enter a valid hex color');
      return;
    }
    setOutputColor(contrastingColour(inputColor));
  }


  return (
    <div className="flex justify-center items-center h-screen flex-col relative">
      <label className='pb-4'> Place your color in Hexcode (6 numbers and charaters only)</label>
      <input onChange={(e) => setInputColor(e.target.value)} className='w-1/4 p-4 border-2 border-gray-300 rounded-md' type='text' placeholder='000000' maxLength={6}/>
      <button className='w-1/6 py-2 my-2 rounded-md bg-slate-500' onClick={handleClick}>Convert</button>
      <div> 
        Your contrasted color is: <span className='text-xl font-bold text-gray-500'>{
          outputColor ? outputColor : '...'
        }</span>
      </div>

      <div className='absolute bottom-0'>
        Last updated on Aug 1st 2022 by Mike Le
      </div>
    </div>
  )
}

export default Home
