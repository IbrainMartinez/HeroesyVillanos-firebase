import './App.css';
//importamos nuestros componentes
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';
import Edit1 from './villanos/Edit';
import CreateVillanos from './villanos/Createheroe';
import Show1 from './villanos/ShowVillanos';

//importamos el router
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">    
     <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Show /> } />
        <Route path='/create' element={ <Create /> } />
        <Route path='/CreateVillanos' element={ <CreateVillanos /> } />
        <Route path='/show' element={ <Show1 /> } />
        <Route path='/edit/:id' element={ <Edit /> } />
        <Route path='/edit1/:id' element={ <Edit1 /> } />
      </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
