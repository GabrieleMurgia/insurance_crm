import { TextInput, Button, Group } from '@mantine/core';
import { DbList } from '../../dbList';
import { useState } from 'react';

export function RicercaClienteForm({ form }) {

  const [showDb,setShowDb] = useState()
  const [filter,setFilter] = useState({codiceFiscale:"",cognome:""})

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
    return (
        <div style={{width:"100%" , display:"flex",flexDirection:"column",alignItems:"center"}}>    
      <form onSubmit={form.onSubmit((values) => handleShowDbList(values))} style={{width:"20%"}} >
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
      </form>

      {showDb && <DbList filter={filter} resetFilter={resetFilter}/>}
        </div>
    );
  }
  