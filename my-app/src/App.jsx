import React, { useState } from 'react'
import { useEffect } from 'react';

function App() {

  // The Variables that are used through out the entire simulation
  const [pageIndex,setPageIndex] = useState(0); // index of pages
  const [frameIndex,setFrameIndex] = useState(0); // index of frames
  const [frameNumber, setFrameNumber] = useState(3);// number of frames
  const [pages, setPages] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); // the page reference
  const [nextText, setNextText] = useState("Start Algorithm"); // text that changes when button is clicked
  const [frames, setFrames] = useState(['-','-','-']); // array which contains placeholders for frames
  const [displayFrames, setDisplayFrames] = useState([]); // array that contains frames to be displayed
  const [framesNum, setFramesNum] = useState([3,4,5]); // option for amount of frames
  const [faults, setFaults] = useState(0); // number of faults
  const [faultedIndexes, setFaultedIndexes] = useState([]); // array which contains every div that has fault

  // variables which put the frameblock divs inside a array
  const elements = document.querySelectorAll('#frameBlock');
  const frameBlock = Array.from(elements);

  // a useEffect function that runs when the site loads
  useEffect(() => {
    const updatedFrames = [];
  
    for (let o = 0; o < pages.length; o++) {
      updatedFrames.push([...frames]);
    }
  
    setDisplayFrames(updatedFrames); 
  }, []); 

// Function for changing the value of the pages individually
  function handleChangeValue(index){
    const changeValue = [...pages]; // copy of the pages array
    changeValue[index]++;

    if(changeValue[index] > 9){ // condition which changes value back to 0 when it reaches 9
      changeValue[index] = 0;
    }

    setPages(changeValue); // pages get set to the copy array
  }

  // function for handling the randomizing of pages
  function handleRandomizePages(){
    const randomizeArray = [...pages]; // copy of pages array
    
    for(let i=0; i< pages.length; i++){
      const randomNum = Math.floor(Math.random() * 10); // 0 to 9 number randomizer
      randomizeArray[i] = randomNum;  // changing specific index to random num
    }
      setPages(randomizeArray); // setting pages to randomized array copy
      console.log(displayFrames) // debug
      console.log(frames); // debug
  } 

// function for handling the changing of frames
  function handleChangeFrameNum(index){
    const arrayCopy = [...frames]; // copy of frames array
    setFrameNumber(index)

       if(frames.length<index){ // check if current frames is less than what user wants
      for(let i = frames.length; i<index;i++){
        arrayCopy.push('-'); // for loop that pushes new frame placeholders
      }
    } else{ // does the opposite

      for(let j = index; j<frames.length; j++){
        arrayCopy.pop(); // removes frames
      }
    }
    setFrames(arrayCopy); // sets frames to copy
    const updatedFrames = []; // copy of displayed frames

    for (let o = 0; o < pages.length; o++) {
      updatedFrames.push([...arrayCopy]); // sets copy of displayed array to frame copy array
    }
    setDisplayFrames(updatedFrames); // sets displayed frames to copy
  }

// function for handling the algorithm
  function handleAlgoRun(){
    if(pageIndex > 19){ // resets the site when all frames are filled
      location.reload();
    }

    if(nextText == "Start Algorithm"){ // changes text and disables other buttons when algo starts
      setNextText("Next Step");
      document.getElementById('randomizeButton').disabled = true;
      document.querySelectorAll('#frameButtons').forEach(el => {
        el.disabled = true;
      });
      document.querySelectorAll('#manualClick').forEach(el => {
        el.style.pointerEvents = 'none';
      });
      }


    let frameArrayCopyIndex; // copy of frames array
    let framesArrayCopyFull = [...displayFrames]; // copy of displayedFrames

    if(pageIndex == 0){ //takes current frames of first page
      frameArrayCopyIndex = [...frames];
    }else{ // takes frames form previous page
      frameArrayCopyIndex = [...displayFrames[pageIndex-1]]; 
      console.log(displayFrames[pageIndex-1] +"  "+"The past") 
    }

    if (!frameArrayCopyIndex.includes(pages[pageIndex])) { // checks if page is inside the frame memory
      frameArrayCopyIndex[frameIndex] = pages[pageIndex]; // sets copy of frame to the value of the current page

      if(frameIndex == frames.length-1){ // sets frameIndex to 0 once reaching maximum frames
        setFrameIndex(0);
      } else{
        setFrameIndex(frameIndex+ 1); // increases frameIndex + 1
      }
      setFaultedIndexes((prev) => [...prev, pageIndex]); // puts faulted frames inside array
      setFaults(faults+1); // increases amount of faults
    } else{
      frameBlock[pageIndex].style.color = "#90EE90"; // changes color of frames
    }
    framesArrayCopyFull[pageIndex] = frameArrayCopyIndex; // puts frames copy to inner displayed frames copy

    if(pageIndex == 19){
      setNextText('Restart Algorithm');
      document.getElementById('algoButton').style.backgroundColor = "red"
    }

    setPageIndex(pageIndex+ 1);// increases page index + 1 

    setDisplayFrames(framesArrayCopyFull); // sets displayed frames to copy
    console.log(pageIndex+"pageIndex    "+ frameIndex+"FrameIndex    D"+ frameNumber)
  }

  return (
    // entire screen
    <section className='bg-gray-300 w-full h-full '> 
    {/* Title */}
    <div className='w-full h-1/12 bg-gray-600 border-4 justify-center items-center flex relative'>
        <h1 className='text-white titleText'>FIFO ALGORITHM</h1>
    </div>
   {/* 2nd section */}
    <div className='h-11/12 w-full bg-white relative'>
   {/* left Panel */}
      <div className='h-full md:w-2/12 bg-gray-500 border-4 border-t-0 absolute left-0 w-5/12 flex-col justify-center overflow-scroll scrollBar'>
   {/* run  algo button */}
        <button className='bg-green-300 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3' id='algoButton' onClick={() => handleAlgoRun()}>{nextText}</button>
   {/* randomize button */}
        <button className='bg-blue-200 h-fit w-12/12 rounded-2xl mt-8 buttonText border-3' id='randomizeButton' onClick={() => handleRandomizePages()}>Generate Random Pages</button>

        <h1 className='H1text text-center mt-10'>No. of Frames</h1>
   {/* Frame numbers */}
        {framesNum.map((frameNum, index) =>
        <button className='w-12/12 buttonText h-1/12 mb-4 rounded-2xl bg-gray-300 buttonText border-3' id='frameButtons' key={index} onClick={() => handleChangeFrameNum(index+3)}>{frameNum}</button>)}
        <div className='h-fit flex justify-center'>
        <h1 className='H1text text-black text-center mt-1'>Faults:</h1>
        <h1 className='H1text text-center mt-1 text-red-700 font-bold'>{faults}</h1>
        </div>

      </div>
   {/* page reference section */}
      <div className='h-1/12 w-7/12 md:w-10/12 absolute top-0 right-0  bg-gray-300 border-r-6 border-2 border-t-0 grid grid-cols-20 lg:flex items-center justify-center'>

      <p className='absolute top-0 left-0'>Page Reference:</p>
      
        {pages.map((page, index)=>
                  <p className='bg-gray-300 w-fit h-fit rounded-3xl lg:mt-2 text-7xl pageReference mr-5 mt-3 p-0 ' id='manualClick' key={index}  onClick={() => handleChangeValue(index)}>
                    {page}
                  </p>)}

      </div>
      <div className='h-11/12 md:w-10/12 absolute bottom-0 right-0 w-7/12 border'>
   {/* displayed frames */}
      <div className='h-full bg-gray-400 border-4 border-t-0 border-l-0 w-full justify-center grid grid-cols-5 md:grid-cols-10 overflow-scroll scrollBar items '>

      {displayFrames.map((displayFrame,i)=>
        <div className={`border-2 border-black  ${faultedIndexes.includes(i) ? 'text-red-400' : ''}`} id='frameBlock' key={i}>
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
