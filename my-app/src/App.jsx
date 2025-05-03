import React, { useState } from 'react'

function App() {

  let pageIndex = 0;
  let frameIndex = 0;
  let [frameNumber, setFrameNumber] = useState(3);
  const frameBlock2d = [];
  const [pages, setPages] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [nextText, setNextText] = useState("Start Algorithm");
  const [frames, setFrames] = useState(['-','-','-']);
  const [framesReal, setRealFrames] = useState([]);
  const [displayFrames, setDisplayFrames] = useState([]);
  const [framesNum, setFramesNum] = useState([3,4,5]);
  const [faults, setFaults] = useState(0);

  window.onload = function(){
    for(let o = 0; o<pages.length;o++){
      setDisplayFrames((oldDisplay => [...oldDisplay,[frames]]))
    }
  }


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
      console.log(displayFrames)
      console.log(frames);
  } 

  function handleChangeFrameNum(index){
    const arrayCopy = [...frames];
    setFrameNumber(index)

       if(frames.length<index){
      for(let i = frames.length; i<index;i++){
        arrayCopy.push('-');
      }
    } else{

      for(let j = index; j<frames.length; j++){
        arrayCopy.pop();
      }
    }
    setFrames(arrayCopy);
    setDisplayFrames([]);
    for(let o = 0; o<pages.length;o++){
      setDisplayFrames((oldDisplay => [...oldDisplay,[arrayCopy]]))
    }
    console.log(arrayCopy) ;
  }

  function handleAlgoRun(){
    console.log(frameNumber)
    for(let k = 0; k<frameBlock.length;k+=frameNumber){
      frameBlock2d.push(frameBlock.slice(k, k + frameNumber));

    }
    if(nextText == "Start Algorithm"){
      setNextText("Next Step");
      document.getElementById('randomizeButton').disabled = true;
      const frameCount = document.querySelectorAll("#frameButtons");
      for(var i = 0; i < frameCount.length; i++) 
        frameCount[i].disabled = true;
    }

    if(frameIndex == frames.length){
      frameIndex = 0;
    } else{
      frames[frameIndex] = pages[pageIndex];
      frameIndex++;
    }
    if(pageIndex == 20){
      pageIndex = 0;
    }else{
      pageIndex++;
    }


    console.log(frameBlock2d)
    console.log(frameIndex +"  "+pageIndex+"  "+frames.length);
  }

  return (
    <section className='bg-gray-300 w-full h-full '>
    <div className='w-full h-1/12 bg-gray-600 border-4 justify-center items-center flex relative'>
        <h1 className='text-white titleText'>FIFO ALGORITHM</h1>
    </div>

    <div className='h-11/12 w-full bg-white relative'>
      <div className='h-full md:w-2/12 bg-gray-500 border-4 border-t-0 absolute left-0 w-5/12 flex-col justify-center overflow-scroll scrollBar'>
        <button className='bg-green-300 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3' onClick={() => handleAlgoRun()}>{nextText}</button>

        <button className='bg-blue-200 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3' id='randomizeButton' onClick={() => handleRandomizePages()}>Generate Random Pages</button>

        <h1 className='H1text text-center mt-10'>No. of Frames</h1>

        {framesNum.map((frameNum, index) =>
        <button className='w-12/12 buttonText h-1/12 mb-4 rounded-2xl bg-gray-300 buttonText border-3' id='frameButtons' key={index} onClick={() => handleChangeFrameNum(index+3)}>{frameNum}</button>)}
        <div className='h-fit flex justify-center'>
        <h1 className='H1text text-black text-center mt-1'>Faults:</h1>
        <h1 className='H1text text-center mt-1 text-red-700 font-bold'>{faults}</h1>
        </div>

      </div>
      
      <div className='h-1/12 w-7/12 md:w-10/12 absolute top-0 right-0  bg-gray-300 border-r-6 border-2 border-t-0 grid grid-cols-20 lg:flex items-center justify-center'>

      <p className='absolute top-0 left-0'>Page Reference:</p>
      
        {pages.map((page, index)=>
                  <p className='bg-gray-300 w-fit h-fit rounded-3xl lg:mt-2 text-7xl pageReference mr-5 mt-3 p-0' key={index} onClick={() => handleChangeValue(index)}>
                    {page}
                  </p>)}

      </div>
      <div className='h-11/12 md:w-10/12 absolute bottom-0 right-0 w-7/12 border'>
      <div className='h-full bg-gray-400 border-4 border-t-0 border-l-0 w-full justify-center grid grid-cols-5 md:grid-cols-10 overflow-scroll scrollBar relative'>

      {displayFrames.map((displayFrame,i)=>
                <div className='border-2' id='frameBlock' key={i}>
                  <div className='md:w-10 w-7 bg-gray-500 h-fit p-2 border text-7xl frameText'>
                  {displayFrame}
                  </div>
                </div>)}


       </div>
      </div>
    </div>

    </section>
  )
}
export default App
