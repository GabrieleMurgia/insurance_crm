import { TextInput, Button, Group, Select} from '@mantine/core';
import { useFormConfiguration } from '../../../../utils/useFormConfiguration';
import { getForms, updateClientPolizza } from '../../../../services/dbRequests';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { periodicitàPolizza, statoPolizza } from '../../../../utils/variabili';

export function InserimentoPolizzaForm({client}) {

  const form = useFormConfiguration({type: "Inserimento Nuova polizza"});
  const [polizzaClients,setPolizzaClients] = useState()

    useEffect(()=>{
          getForms()
          .then(data => setPolizzaClients(data))
          .catch(error => console.error('Error:', error))
      },[])

    const handleSubmit = (values) => {     
      // Get the existing polizze from the client
      let existingPolizze = JSON.parse(client.polizza) || '[]';
      let updatedPolizze =[]
      let tempArray = []

      if(existingPolizze[0] === ""){
        updatedPolizze = values
        updateClientPolizza(client.id, JSON.stringify(updatedPolizze));
        return
      }else{
       if(Array.isArray(existingPolizze)){
        updatedPolizze = [...existingPolizze, values];
        updateClientPolizza(client.id, JSON.stringify(updatedPolizze));
        return
       }else{
        if(Array.isArray(JSON.parse(existingPolizze))){
          tempArray = JSON.parse(existingPolizze)
          tempArray.push(values)
          updateClientPolizza(client.id, JSON.stringify(tempArray));
          return
        }
        tempArray = [...tempArray,JSON.parse(existingPolizze)]        
        if (tempArray.length === 1) {
          tempArray.push(values);
        } else {
          tempArray = [...tempArray[0], values];
        }
        
        console.log(tempArray);
        updateClientPolizza(client.id, JSON.stringify(tempArray));
       }
      }
  };

  

  return (
    <><h2>Inserimento Polizza - {client.nome} {client.cognome} </h2> 
   <form onSubmit={form.onSubmit(handleSubmit)}>
     <div style={{display:"flex"}}>
     <TextInput
        label="Punto vendita"
        {...form.getInputProps('puntoVendita')}
        error={form.errors.puntoVendita}
      />
      <TextInput
        label="Compagnia"
        {...form.getInputProps('compagnia')}
        error={form.errors.compagnia}
      />
      <TextInput
        label="Polizza"
        {...form.getInputProps('polizza')}
        error={form.errors.polizza}
      />
      <TextInput
        label="Prodotto"
        {...form.getInputProps('prodotto')}
        error={form.errors.prodotto}
      />
      <TextInput
        label="Targa"
        {...form.getInputProps('targa')}
        error={form.errors.targa}
      />
     </div>
     <div style={{display:"flex"}}>
      <Select label="Periodicità" data={periodicitàPolizza} {...form.getInputProps('periodicita')} 
          error={form.errors.periodicita}>
        
      </Select>

           <div style={{display:"flex",alignItems:"flex-end"}}></div>
      <TextInput
        label="Effetto"
        {...form.getInputProps('effetto')}
        error={form.errors.effetto}
      />
       <DatePickerInput
      placeholder=" Scadenza "
      label="Scadenza"
      withAsterisk
      {...form.getInputProps('scadenza')}
      error={form.errors.scadenza}
    />
      <TextInput
        label="Premio"
        {...form.getInputProps('premio')}
        error={form.errors.premio}
      />
      <TextInput
        label="Commissioni"
        {...form.getInputProps('commissioni')}
        error={form.errors.commissioni}
      />
     </div>
      <div style={{display:"flex"}}>
      <TextInput
        label="Autocontrollo 2.0"
        {...form.getInputProps('autocontrollo')}
        error={form.errors.autocontrollo}
      />

      <Select label="Stato" data={statoPolizza} {...form.getInputProps('stato')}
        error={form.errors.stato}>
        
      </Select>
      <TextInput
        label="Sospensione"
        {...form.getInputProps('sospensione')}
        error={form.errors.sospensione}
      />
      <TextInput
        label="Motivo sospensione"
        {...form.getInputProps('motivoSospensione')}
        error={form.errors.motivoSospensione}
      />
      <TextInput
        label="Note"
        {...form.getInputProps('note')}
        error={form.errors.note}
      />
      </div>
      <Group position="right" mt="md">
        <Button type="reset">Reset</Button>
        <Button type="submit">Invia</Button>
      </Group>
    </form>

    <div>

    </div>
        </>
    
  );
}