import { Button, Group, ScrollArea } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { MonthPickerInput } from '@mantine/dates';
import { useEffect , useState } from 'react';
import { getForms, searchByDate } from '../../../../services/dbRequests';
import { ItemPolizza } from '../../policyDetails/ItemPolizza';


export function PolizzeInScadenzaForm({ form }) {

  const [policies, setPolicies] = useState([]);
  const [mensili, setMensili] = useState([]);
  const [trimestrale, setTrimestrale] = useState([]);
  const [semestrale, setSemestrale] = useState([]);
  const [annuale, setAnnuale] = useState([]);

  useEffect(()=>{
    let tempArray = []
    getForms()
    .then(data => {
      data.map(item=>{
        if(item.polizza.length !== 0){
          let tempItem;
          try {
            tempItem = JSON.parse(item.polizza);
          } catch (e) {
            console.error('Error parsing polizza:', e);
            return;
          }

          if(Array.isArray(tempItem)){
            tempItem.map(genni =>{
              tempArray.push({...genni,nome:item.nome,cognome:item.cognome,id:item.id});
            });
          } else {
            tempArray.push(tempItem);
          }
        }
      });
      let flattenedArray = tempArray.flat(); // Questa linea appiattisce l'array
      setPolicies(flattenedArray);
    })
    .catch(error => console.error('Error:', error));
  },[])

  const handleSubmit = async (values) => {
    // Create a new Date object from the selected year and month
    const selectedDate = new Date(values.year.getFullYear(), values.month ? values.month.getMonth() : 1, 1);
  
    // Filter the policies
    const filteredPolicies = {
      mensile: [],
      trimestrale: [],
      semestrale: [],
      annuale: [],
    };
  
    policies.forEach(policy => {
      const policyScadenza = new Date(policy?.scadenza);
      const diffTime = Math.abs(policyScadenza - selectedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
      if (diffDays <= 30) {
        filteredPolicies.mensile.push(policy);
      } else if (diffDays > 30 && diffDays <= 90) {
        filteredPolicies.trimestrale.push(policy);
      } else if (diffDays > 90 && diffDays <= 180) {
        filteredPolicies.semestrale.push(policy);
      } else if (diffDays > 180 && diffDays <= 360) {
        filteredPolicies.annuale.push(policy);
      }
    });
  
    setMensili(filteredPolicies.mensile)
    setTrimestrale(filteredPolicies.trimestrale)
    setSemestrale(filteredPolicies.semestrale)
    setAnnuale(filteredPolicies.annuale)
  
    console.log(mensili,trimestrale,semestrale,annuale)
  };

  return (
   <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
     <form onSubmit={form.onSubmit(handleSubmit)}>
     <YearPickerInput
      label="Seleziona Anno"
      placeholder="Seleziona Anno"
      value={form.values.year}
      onChange={(date) => form.setFieldValue('year', date)}
      error={form.errors.year}
      mx="auto"
      maw={400}
    />

    <MonthPickerInput
      label="Seleziona Mese"
      placeholder="Seleziona Mese"
      value={form.values.month}
      onChange={(date) => form.setFieldValue('month', date)}
      error={form.errors.month}
      mx="auto"
      maw={400}
    />

    <Group position="right" mt="md">        
      <Button type="submit">Estrai</Button>
    </Group>
    </form>

    
  {(mensili.length > 0 || trimestrale.length > 0 || semestrale.length > 0 || annuale.length > 0) && <>
 
    <div style={{display:"flex",flexDirection:"column"}}>
 <div style={{display:"flex"}}>
 {mensili.length > 0 &&  
    <div style={{display: "flex", flexDirection: "column", fontWeight: "bold", margin: "10px"}}>
      <span>Scade entro un mese:</span>
      <ScrollArea h={400}>
      {mensili.map((policy, index) => (
         <ItemPolizza key={index} polizza={policy}></ItemPolizza>
      ))}
      </ScrollArea>
    </div>
  }
  
  {trimestrale.length > 0 && 
    <div style={{display: "flex", flexDirection: "column", fontWeight: "bold", margin: "10px"}}>
      <span>Scade entro tre mesi:</span>
      <ScrollArea h={400}>
      {trimestrale.map((policy, index) => (
        <ItemPolizza key={index} polizza={policy}></ItemPolizza>
      ))}
      </ScrollArea>
    </div>
  }
  
  {semestrale.length > 0 &&  
    <div style={{display: "flex", flexDirection: "column", fontWeight: "bold", margin: "10px"}}>
      <span>Scade entro sei mesi:</span>
      <ScrollArea h={400}>
      {semestrale.map((policy, index) => (
         <ItemPolizza key={index} polizza={policy}></ItemPolizza>
      ))}
      </ScrollArea>
    </div>
  }
  
  {annuale.length > 0 && 
    <div style={{display: "flex", flexDirection: "column", fontWeight: "bold", margin: "10px"}}>
      <span>Scade entro un anno:</span>
      <ScrollArea h={400}>
      {annuale.map((policy, index) => (
        <ItemPolizza key={index} polizza={policy}></ItemPolizza>
      ))}
      </ScrollArea>
    
    </div>
  }
 </div>
</div>
  </>}
   </div>
  );
}