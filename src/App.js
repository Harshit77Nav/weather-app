import './App.css';
import Home from './Component/Home';
import  Search  from './Component/Search';
import Details from "./Component/Details"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
