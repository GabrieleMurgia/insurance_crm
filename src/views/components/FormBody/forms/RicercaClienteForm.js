import { TextInput, Button, Group, Box } from '@mantine/core';
import { DbList } from '../../dbList';
import { useEffect, useState } from 'react';
import { InserimentoNuovoClienteForm } from './InserimentoNuovoClienteForm';

export function RicercaClienteForm({ form }) {

  const [showDb,setShowDb] = useState()
  const [filter,setFilter] = useState({codiceFiscale:"",cognome:""})
  const [showClientModule,setShowClientModule] = useState()
  const [client,setClient]= useState()

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

  const handleShowClientModule = (client)=>{
    setClient(client);
    setShowClientModule(true);


  }

  const updateClient = (newClient) => {
    setClient(newClient);
  };

  useEffect(()=>{
    if(client){
      setShowClientModule(true)
    }
  },[client])



    return (
        <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>

      {!showClientModule && <form onSubmit={form.onSubmit((values) => handleShowDbList(values))}>
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
       <InserimentoNuovoClienteForm client={client} updateClient={updateClient} />
      }

     
        </div>
    );
  }