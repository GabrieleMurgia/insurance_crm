import { useState } from 'react';
import './App.css';
import { linksHeader } from './utils/variabili';
import { FormBody } from './views/components/FormBody/FormBody';
import { HeaderMenu } from './views/components/HeaderMenu';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import { EditPolizza } from './views/modificaPolizza/EditPolizza';




function App() {

  const [typeForm,setTypeForm] = useState()

  const handleTypeForm = (type)=>{
    setTypeForm(type)
  }

  
  return (
    <Router>
    <div className="App">
      <h1>Toretto Assicurazioni</h1>
      <Routes>
        <Route path="/form" element={
          <>
            <HeaderMenu links={linksHeader} handleTypeForm={handleTypeForm}/>
            <FormBody type={typeForm}/>
          </>
        }/>
        <Route path="/edit-polizza" element={<EditPolizza />} />
        <Route path="/" element={<Navigate to="/form" />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
