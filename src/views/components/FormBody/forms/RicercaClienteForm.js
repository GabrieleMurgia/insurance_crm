import { TextInput, Button, Group } from '@mantine/core';
import { DbList } from '../../dbList';
import { useState } from 'react';
import { InserimentoNuovoClienteForm } from './InserimentoNuovoClienteForm';

export function RicercaClienteForm({ form }) {

  const [showDb,setShowDb] = useState()
  const [filter,setFilter] = useState({codiceFiscale:"",cognome:""})
  const [showClientModule,setShowClientModule] = useState()

  const handleShowDbList = (values)=>{
    setFilter((prev) => ({
      ...prev,
      codiceFiscale: values.codiceFiscale,
      cognome: values.cognome,
    }));
    setShowDb(true);
  }

  const resetFilter = ()=>{
    setFilter(null)
  }

  const handleShowClientModule = ()=>{
    setShowClientModule(true)
  }

    return (
        <div style={{width:"100%" , display:"flex",flexDirection:"column",alignItems:"center"}}>    
      {!showClientModule && <form onSubmit={form.onSubmit((values) => handleShowDbList(values))} style={{width:"20%"}} >
        <TextInput
          label="Cognome"
          {...form.getInputProps('cognome')}
        />
        <TextInput
          label="Codice fiscale"
          {...form.getInputProps('codiceFiscale')}
        />
        <Group position="right" mt="md">
          <Button type="reset">Reset</Button>
          <Button type="submit" >Ricerca</Button>
        </Group>
      </form>}

      {showDb && !showClientModule && <DbList filter={filter} resetFilter={resetFilter} handleShowClientModule={handleShowClientModule}/>}


      {showClientModule && 
       <InserimentoNuovoClienteForm form={form} client={""} />
      }
        </div>
    );
  }
  