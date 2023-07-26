import { Button, Group } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { MonthPickerInput } from '@mantine/dates';
import { useEffect , useState } from 'react';
import { getForms, searchByDate } from '../../../../services/dbRequests';


export function PolizzeInScadenzaForm({ form }) {

  const [policies, setPolicies] = useState([]);
  const [mensili, setMensili] = useState([]);
  const [trimestrale, setTrimestrale] = useState([]);
  const [semestrale, setSemestrale] = useState([]);
  const [annuale, setAnnuale] = useState([]);

  useEffect(()=>{
    let tempArray = []
    let tempItem = ""
    getForms()
    .then(data => {
      data.map(item=>{
        if(item.polizza.length !== 0){
          tempItem = JSON.parse(item.polizza)
          tempArray.push(tempItem)
          tempItem = null
        }
      })
      let flattenedArray = tempArray.flat(); // Questa linea appiattisce l'array
      setPolicies(flattenedArray)
    })
    .catch(error => console.error('Error:', error))
  },[])

  const handleSubmit = async (values) => {
    // Create a new Date object from the selected year and month
    const selectedDate = new Date(values.year.getFullYear(), values.month ? values.month.getMonth() + 1 : 1, 1);
  
    // Define the end dates for each periodicity
    const endDateAnnuale = new Date(selectedDate);
    endDateAnnuale.setFullYear(endDateAnnuale.getFullYear() + 1);
  
    const endDateSemestrale = new Date(selectedDate);
    endDateSemestrale.setMonth(endDateSemestrale.getMonth() + 6);
  
    const endDateTrimestrale = new Date(selectedDate);
    endDateTrimestrale.setMonth(endDateTrimestrale.getMonth() + 3);
  
    const endDateMensile = new Date(selectedDate);
    endDateMensile.setMonth(endDateMensile.getMonth() + 1);
  
    // Filter the policies
    const filteredPolicies = {
      annuale: [],
      semestrale: [],
      trimestrale: [],
      mensile: [],
    };
  
    policies.forEach(policy => {
      const policyScadenza = new Date(policy.scadenza);
  
      if (policy.periodicita === 'Annuale' && policyScadenza <= endDateAnnuale) {
        filteredPolicies.annuale.push(policy);
      } else if (policy.periodicita === 'Semestrale' && policyScadenza <= endDateSemestrale) {
        filteredPolicies.semestrale.push(policy);
      } else if (policy.periodicita === 'Trimestrale' && policyScadenza <= endDateTrimestrale) {
        filteredPolicies.trimestrale.push(policy);
      } else if (policy.periodicita === 'Mensile' && policyScadenza <= endDateMensile) {
        filteredPolicies.mensile.push(policy);
      }
    });
  
    setMensili(filteredPolicies.mensile)
    setTrimestrale(filteredPolicies.trimestrale)
    setSemestrale(filteredPolicies.semestrale)
    setAnnuale(filteredPolicies.annuale)
  };

  return (
   <div>
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

    <div style={{display:"flex",flexDirection:"column"}}>
  {(mensili.length > 0 || trimestrale.length > 0 || semestrale.length > 0 || annuale.length > 0) && <span>Polizze in Scadenza:</span>}
  
  {mensili.length > 0 &&  
    <div>
      <span>Mensili:</span>
      {mensili.map((policy, index) => (
        <div key={index}>{policy.name}</div> // Replace 'name' with the actual property you want to display
      ))}
    </div>
  }
  
  {trimestrale.length > 0 && 
    <div>
      <span>Trimestrali:</span>
      {trimestrale.map((policy, index) => (
        <div key={index}>{policy.name}</div> // Replace 'name' with the actual property you want to display
      ))}
    </div>
  }
  
  {semestrale.length > 0 &&  
    <div>
      <span>Semestrali:</span>
      {semestrale.map((policy, index) => (
        <div key={index}>{policy.name}</div> // Replace 'name' with the actual property you want to display
      ))}
    </div>
  }
  
  {annuale.length > 0 && 
    <div>
      <span>Annuali:</span>
      {annuale.map((policy, index) => (
        <div key={index}>{policy.name}</div> // Replace 'name' with the actual property you want to display
      ))}
    </div>
  }
</div>
   </div>
  );
}