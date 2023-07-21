import { Button, Group } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { MonthPickerInput } from '@mantine/dates';
import { useState } from 'react';
import { searchByDate } from '../../../../services/dbRequests';


export function PolizzeInScadenzaForm({ form }) {

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

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
    /*   console.log('Month:', newMonth.getMonth() + 1);
      console.log('Year:', newMonth.getFullYear()); */
      setMonth(newMonth);
    } else {
      setMonth(null);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from being submitted in the default way
    // Call the new route with the year and month as parameters
    const data = await searchByDate(year ? year.getFullYear() : null, month ? month.getMonth() + 1 : null);
    console.log(data);
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