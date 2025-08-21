import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [length, setLength] = useState();
  // const handleData =()=> {
  //   const fetchButton = button;
    
  // }
  const handlePrevButton = ()=>{
    if(page!=1){
      setPage(page-1);
    }
    else{
      alert("No more products")
    }
  }
  const handleNextButton = () => {
    if(length){
    setPage(page+1);
    }
    else{
      alert("No more product");
    }
  }
  const handleLimit = (e) =>{
setLimit(e.target.value)
  }

  useEffect(()=>{
   fetch(`http://localhost:3000/products/?limit=${limit}&page=${page}`)
    .then((res)=>res.json())
    .then((data)=>{
      const cleanedData = data.filter(item=>item !== null);
      if(cleanedData.length==0){
        alert("No more product");
        setPage(1);
      }
      else{
        setData(data);
      setLength(cleanedData.length);
      }
      
  })
  },[limit,page])

  return (
    <div className="container">
      <div>
        <button onClick={handlePrevButton}>Prev</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
      <div>
        <select value = {limit} onChange={handleLimit}>
  <option value={5}>5</option>
  <option value={10}>10</option>
  <option value={15}>15</option>
  <option value={20}>20</option>
  <option value={25}>25</option>
  <option value={30}>30</option>
</select>
      </div>
      <div>
      {
      data.map((e)=>(
        
        <div key ={e.id} className="subContainer">{e.title}</div>
      ))
      }
      </div>
    </div>
  )
}

export default App
