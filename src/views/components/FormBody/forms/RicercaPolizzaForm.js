import React, { useEffect, useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { ItemPolizza } from '../../policyDetails/elementoPolizze';
import { getForms } from '../../../../services/dbRequests';
import { ScrollArea } from '@mantine/core';

export function RicercaPolizzaForm({ form }) {

  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [showForm,setShowForm] = useState(true)

  useEffect(() => {
    let tempArray = []
    let tempItem = ""
    getForms()
    .then(data => {
      data.map(item=>{
        if(item.polizza.length !== 0){
          if(Array.isArray(item.polizza)){
            return
          }
          tempItem = JSON.parse(item.polizza)
         if(Array.isArray(tempItem)){
          tempItem.map(genni =>{
            tempArray.push({...genni,nome:item.nome,cognome:item.cognome})
          })
         }else{
          tempArray.push(tempItem)
         }
          tempItem = null
        }
      })
      let flattenedArray = tempArray.flat();
      console.log(flattenedArray)
      setPolicies(flattenedArray)
      setFilteredPolicies(flattenedArray)
    })
    .catch(error => console.error('Error:', error))
  }, []);

  const handleSearch = (values) => {
    let filtered = policies.filter(policy => {
      return Object.keys(values).every(key => {
        return String(policy[key]).toLowerCase().includes(String(values[key]).toLowerCase());
      });
    });
    setFilteredPolicies(filtered);
  }


  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Button onClick={()=>{setShowForm(!showForm)}}>X</Button>
    {showForm && <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
        <div style={{display:"flex"}}>
        <TextInput
        label="Cognome"
        {...form.getInputProps('cognome')}
      />
      <TextInput
        label="Nome"
        {...form.getInputProps('nome')}
      />
        </div>
      <TextInput
        label="Targa"
        {...form.getInputProps('targa')}
      />
      <TextInput
        label="Polizza"
        {...form.getInputProps('polizza')}
      />
      <TextInput
        label="Punto vendita"
        {...form.getInputProps('puntoVendita')}
      />
      <TextInput
        label="Compagnia"
        {...form.getInputProps('compagnia')}
      />
      <Group position="right" mt="md">
        <Button type="reset">Reset</Button>
        <Button type="submit">Ricerca</Button>
      </Group>
    </form>}
    <div>
       <ScrollArea h={showForm ? 160 : 500}>
       {filteredPolicies.map((policy, index) => (
         <ItemPolizza key={index} polizza={policy} />
      ))}
      </ScrollArea>
    </div>
    </div>
  );
}