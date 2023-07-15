import { TextInput, Button, Group, Radio } from '@mantine/core';
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import axios from 'axios';
import { submitForm } from '../../../../services/dbRequests';


export function InserimentoNuovoClienteForm({form , client}) {

  const [date, setDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

    return (
      <>
      <form onSubmit={form.onSubmit((values) => {
        submitForm(values)
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
})}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <TextInput
          label="Cognome"
          {...form.getInputProps('cognome')}
          error={form.errors.cognome}
        />
        <TextInput
          label="Nome"
          {...form.getInputProps('nome')}
          error={form.errors.nome}
        />
       <div>
  <label>Sesso</label>
  <Radio
    {...form.getInputProps('sesso')}
    checked={form.values.sesso === 'Maschio'}
    value="Maschio"
    label="Maschio"
    onChange={() => form.setFieldValue('sesso', 'Maschio')}
  />
  <Radio
    {...form.getInputProps('sesso')}
    checked={form.values.sesso === 'Femmina'}
    value="Femmina"
    label="Femmina"
    onChange={() => form.setFieldValue('sesso', 'Femmina')}
  />
</div>
      </div>

        <div style={{display:"flex",justifyContent:"space-between"}}>
        <DatePicker
        label="Data di nascita"
        value={date}
        onChange={setDate}
        required
        size='xs'
        placeholder="Seleziona una data"
        {...form.getInputProps('dataDiNascita')}
        />
       <div>
       <TextInput
          label="Luogo"
          {...form.getInputProps('luogo')}
          error={form.errors.luogo}
        />
         <TextInput
          label="Provincia Nascita"
          {...form.getInputProps('provincia-nascita')}
          error={form.errors['provincia-nascita']}
        />
        <TextInput
          label="Nazione"
          {...form.getInputProps('nazione')}
          error={form.errors.nazione}
        />
           <div style={{display:"flex",alignItems:"flex-end"}}>
        <TextInput
          label="Codice fiscale"
          {...form.getInputProps('codiceFiscale')}
          error={form.errors.codiceFiscale}
        />
        <Button mt={24} >Genera</Button>
      </div>
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
       </div>
    
        </div>
        
     
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <TextInput
          label="Indirizzo"
          {...form.getInputProps('indirizzo')}
          error={form.errors.indirizzo}
        />
        <TextInput
          label="Regione"
          {...form.getInputProps('regione')}
          error={form.errors.regione}
        />
        <TextInput
          label="Provincia"
          {...form.getInputProps('provincia')}
          error={form.errors.provincia}
        />
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <TextInput
          label="Comune"
          {...form.getInputProps('comune')}
          error={form.errors.comune}
        />
        <TextInput
          label="Cap"
          {...form.getInputProps('cap')}
          error={form.errors.cap}
        />
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <TextInput
          label="Telefono(1)"
          {...form.getInputProps('telefono1')}
          error={form.errors.telefono1}
        />
        <TextInput
          label="Telefono(2)"
          {...form.getInputProps('telefono2')}
          error={form.errors.telefono2}
        />
        <TextInput
          label="Email"
          {...form.getInputProps('email')}
          error={form.errors.email}
        />
        </div>
        <Group position="right" mt="md">
          <Button type="reset">Reset</Button>
          <Button type="submit">Invia</Button>
        </Group>
      </form>
      </>
    );
  }