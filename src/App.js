import { useState } from 'react';
import './App.css';
import { linksHeader } from './utils/variabili';
import { FormBody } from './views/components/FormBody/FormBody';
import { HeaderMenu } from './views/components/HeaderMenu';


function App() {

  const [typeForm,setTypeForm] = useState()

  const handleTypeForm = (type)=>{
    setTypeForm(type)
  }

  
  return (
    <div className="App">
     <h1>Toretto Assicurazioni</h1>
      <HeaderMenu links={linksHeader} handleTypeForm={handleTypeForm}/>
      <FormBody type={typeForm}/>
    </div>
  );
}

export default App;
