import React, { useState } from 'react'

function App() {

  const [pages, setPages] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

  function handleChangeValue(index){
    
    const changeValue = [...pages];
    changeValue[index]++;

    if(changeValue[index] > 9){
      changeValue[index] = 0;
    }

    setPages(changeValue);
  }

  return (
    <section className='bg-gray-300 w-full h-full '>
    <div className='w-full h-1/12 bg-gray-600 border-4 justify-center items-center flex'>
        <h1 className='text-white titleText'>FIFO ALGORITHM</h1>
    </div>

    <div className='h-11/12 w-full bg-white relative'>
      <div className='h-full md:w-2/12 bg-gray-500 border-4 border-t-0 absolute left-0 w-5/12 flex justify-center'>
        <p className='bottom-0 absolute text-center'>Click on the numbers to change value</p>
      </div>

      <div className='h-full md:w-10/12 bg-gray-400 border-4 border-t-0 border-l-0 absolute right-0 w-7/12 flex justify-center grid grid-cols-5 lg:grid-cols-20 md:grid-cols-10'>

        {pages.map((page, index)=>
        <div className='bg-gray-300 ml-2 sm:ml-1 md:ml-3 w-fit h-fit p-2 rounded-2xl mt-2 text-7xl pageReference' key={index} onClick={() => handleChangeValue(index)}>
          {page}
        </div>)}

      </div>

    </div>

    </section>
  )
}
export default App
