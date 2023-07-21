
import { TextInput, Button, Group} from '@mantine/core';
import { useFormConfiguration } from '../../../../utils/useFormConfiguration';
import { getForms, updateClientPolizza } from '../../../../services/dbRequests';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

export function InserimentoPolizzaForm({client}) {

    const form = useFormConfiguration({type: "Inserimento Nuova polizza"});
    const [polizzaClients,setPolizzaClients] = useState()

    useEffect(()=>{
          getForms()
          .then(data => setPolizzaClients(data))
          .catch(error => console.error('Error:', error))
      },[])

  

  return (
    <><h2>Inserimento Polizza - {client.nome} {client.cognome} </h2> 
    <form onSubmit={form.onSubmit((values) => {
        // Call the update function with the client id and the form values
        updateClientPolizza(client.id, values);
        console.log("porcodio")
        })}>
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
     <TextInput
        label="Periodicità"
        {...form.getInputProps('periodicita')}
        error={form.errors.periodicita}
      />
      <TextInput
        label="Effetto"
        {...form.getInputProps('effetto')}
        error={form.errors.effetto}
      />
     {/*  <TextInput
        label="Scadenza"
        {...form.getInputProps('scadenza')}
        error={form.errors.scadenza}
      /> */}
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
      <TextInput
        label="Stato"
        {...form.getInputProps('stato')}
        error={form.errors.stato}
      />
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