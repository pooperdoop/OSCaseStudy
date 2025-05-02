import React, { useState } from 'react'

function App() {

  const [pages, setPages] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const pageNumber = 0;
  const [frames, setFrames] = useState([0,0,0]);
  const [framesNum, setFramesNum] = useState([3,4,5]);
  const [faults, setFaults] = useState(0);

  function handleChangeValue(index){
    
    const changeValue = [...pages];
    changeValue[index]++;

    if(changeValue[index] > 9){
      changeValue[index] = 0;
    }

    setPages(changeValue);
  }

  function handleRandomizePages(){

    const randomizeArray = [...pages];
    
    for(let i=0; i< pages.length; i++){
      const randomNum = Math.floor(Math.random() * 10); // 0 to 9 number randomizer
      randomizeArray[i] = randomNum; 
    }
      setPages(randomizeArray);

  }

  return (
    <section className='bg-gray-300 w-full h-full '>
    <div className='w-full h-1/12 bg-gray-600 border-4 justify-center items-center flex relative'>
        <h1 className='text-white titleText'>FIFO ALGORITHM</h1>
        <p className='absolute bottom-0 text-center text-white'>white = page, dark gray = frame</p>
    </div>

    <div className='h-11/12 w-full bg-white relative'>
      <div className='h-full md:w-2/12 bg-gray-500 border-4 border-t-0 absolute left-0 w-5/12 flex-col justify-center overflow-scroll scrollBar'>
        <button className='bg-green-300 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3'>Run Algorithm</button>

        <button className='bg-blue-200 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3' onClick={() => handleRandomizePages()}>Generate Random Pages</button>

        <h1 className='H1text text-center mt-10'>No. of Frames</h1>

        {framesNum.map((frameNum, _) =>
        <button className='w-12/12 buttonText h-1/12 mb-4 rounded-2xl bg-gray-300 buttonText border-3'>{frameNum}</button>)}
        <div className='h-fit flex justify-center'>
        <h1 className='H1text text-black text-center mt-1'>Faults:</h1>
        <h1 className='H1text text-center mt-1 text-red-700 font-bold'>{faults}</h1>
        </div>

      </div>

      <div className='h-full md:w-10/12 bg-gray-400 border-4 border-t-0 border-l-0 absolute right-0 w-7/12 justify-center grid grid-cols-5 md:grid-cols-10 overflow-scroll scrollBar'>

        {pages.map((page, index)=>
            <div className='flex-col border justify-center items-center'>
                <div className='bg-gray-300 ml-auto mr-auto  w-fit h-fit p-2 rounded-3xl mt-2 text-7xl pageReference' key={index} onClick={() => handleChangeValue(index)}>
                  {page}
                </div>
              {frames.map((frame,i)=>
                <div className='bg-gray-500 ml-auto mr-auto  w-fit h-fit p-2 rounded mt-2 text-7xl frameText'>
                  {frame}
                </div>)}
            </div>)}

      </div>

    </div>

    </section>
  )
}
export default App
