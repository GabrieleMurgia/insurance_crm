import { Button, Group } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { MonthPickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { getForms, searchByDate } from '../../../../services/dbRequests';


export function PolizzeInScadenzaForm({ form }) {

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [policies, setPolicies] = useState([]);


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

  const handleYearChange = (newYear) => {
    if (newYear) {
      console.log('Year:', newYear.getFullYear());
      setYear(newYear);
    } else {
      setYear(null);
    }
  };

  const handleMonthChange = (newMonth) => {
    if (newMonth) {
      setMonth(newMonth);
    } else {
      setMonth(null);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
    // Create a new Date object from the selected year and month
    const selectedDate = new Date(year.getFullYear(), month.getMonth() + 1, 1); // Month is 0-indexed, so we add 1
  
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
  
    console.log(filteredPolicies);
  };


    return (
      <form onSubmit={handleSubmit}>
       <YearPickerInput
        label="Seleziona Anno"
        placeholder="Seleziona Anno"
        value={year}
        onChange={handleYearChange}
        mx="auto"
        maw={400}
      />

      <MonthPickerInput
        label="Seleziona Mese"
        placeholder="Seleziona Mese"
        value={month}
        onChange={handleMonthChange}
        mx="auto"
        maw={400}
      />

        <Group position="right" mt="md">        
          <Button type="submit">Estrai</Button>
        </Group>
      </form>
    );
  }