import React, { useState } from 'react'
import { useEffect } from 'react';

function App() {

  const [pageIndex,setPageIndex] = useState(0);
  const [frameIndex,setFrameIndex] = useState(0);
  const [frameNumber, setFrameNumber] = useState(3);
  const [pages, setPages] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [resetFrames, setResetFrames] = useState([]);
  const [nextText, setNextText] = useState("Start Algorithm");
  const [frames, setFrames] = useState(['-','-','-']);
  const [displayFrames, setDisplayFrames] = useState([]);
  const [framesNum, setFramesNum] = useState([3,4,5]);
  const [faults, setFaults] = useState(0);
  const [faultedIndexes, setFaultedIndexes] = useState([]);

  const elements = document.querySelectorAll('#frameBlock');
  const frameBlock = Array.from(elements);

  useEffect(() => {
    const updatedFrames = [];
  
    for (let o = 0; o < pages.length; o++) {
      updatedFrames.push([...frames]);
    }
  
    setDisplayFrames(updatedFrames); 
    setResetFrames(updatedFrames);
  }, []); 


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
    const updatedFrames = [];

    for (let o = 0; o < pages.length; o++) {
      updatedFrames.push([...arrayCopy]); // 
    }
    setDisplayFrames(updatedFrames); 
  }



  function handleAlgoRun(){
    if(pageIndex > 19){
      location.reload();
    }

    if(nextText == "Start Algorithm"){
      setNextText("Next Step");
      document.getElementById('randomizeButton').disabled = true;
      document.querySelectorAll('#frameButtons').forEach(el => {
        el.disabled = true;
      });
      document.querySelectorAll('#manualClick').forEach(el => {
        el.style.pointerEvents = 'none';
      });
      }


    let frameArrayCopyIndex;
    let framesArrayCopyFull = [...displayFrames];

    if(pageIndex == 0){
      frameArrayCopyIndex = [...frames];
    }else{
      frameArrayCopyIndex = [...displayFrames[pageIndex-1]];
      console.log(displayFrames[pageIndex-1] +"  "+"The past")
    }

    if (!frameArrayCopyIndex.includes(pages[pageIndex])) {
      frameArrayCopyIndex[frameIndex] = pages[pageIndex];

      if(frameIndex == frames.length-1){
        setFrameIndex(0);
      } else{
        setFrameIndex(frameIndex+ 1);
      }
      setFaultedIndexes((prev) => [...prev, pageIndex]);
      setFaults(faults+1);
    } else{
      frameBlock[pageIndex].style.color = "#90EE90";
    }
    framesArrayCopyFull[pageIndex] = frameArrayCopyIndex;

    if(pageIndex == 19){
      setNextText('Restart Algorithm');
      document.getElementById('algoButton').style.backgroundColor = "red"
    }

    setPageIndex(pageIndex+ 1);

    setDisplayFrames(framesArrayCopyFull);
    console.log(pageIndex+"pageIndex    "+ frameIndex+"FrameIndex    D"+ frameNumber)
  }

  return (
    <section className='bg-gray-300 w-full h-full '>
    <div className='w-full h-1/12 bg-gray-600 border-4 justify-center items-center flex relative'>
        <h1 className='text-white titleText'>FIFO ALGORITHM</h1>
    </div>

    <div className='h-11/12 w-full bg-white relative'>
      <div className='h-full md:w-2/12 bg-gray-500 border-4 border-t-0 absolute left-0 w-5/12 flex-col justify-center overflow-scroll scrollBar'>
        <button className='bg-green-300 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3' id='algoButton' onClick={() => handleAlgoRun()}>{nextText}</button>

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
                  <p className='bg-gray-300 w-fit h-fit rounded-3xl lg:mt-2 text-7xl pageReference mr-5 mt-3 p-0 ' id='manualClick' key={index}  onClick={() => handleChangeValue(index)}>
                    {page}
                  </p>)}

      </div>
      <div className='h-11/12 md:w-10/12 absolute bottom-0 right-0 w-7/12 border'>
      <div className='h-full bg-gray-400 border-4 border-t-0 border-l-0 w-full justify-center grid grid-cols-5 md:grid-cols-10 overflow-scroll scrollBar items '>

      {displayFrames.map((displayFrame,i)=>
        <div className={`border-2 border-black  ${faultedIndexes.includes(i) ? 'text-red-500' : ''}`} id='frameBlock' key={i}>
         {displayFrame.map((inner,innerIndex)=>
          <div className='ml-auto mr-auto border w-fit pageReference bg-gray-500' key={innerIndex} id='displayedFrames'>
            {inner}
          </div>)}
        </div>)}


       </div>
      </div>
    </div>

    </section>
  )
}
export default App
