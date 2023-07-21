import { TextInput, Button, Group, Radio , Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import { submitForm } from '../../../../services/dbRequests';
import { useFormConfiguration } from '../../../../utils/useFormConfiguration';
import { InserimentoPolizzaForm } from './InserimentoPolizza';
import { DatePickerInput } from '@mantine/dates';
import { nazioniDelMondo, provincePerRegione, regioniItaliane } from '../../../../utils/variabili';
import { Select } from '@mantine/core';



export function InserimentoNuovoClienteForm({client , updateClient}) {

  const form = useFormConfiguration({type: "Inserimento Nuovo Cliente",client});
  const [errorMessage] = useState('');
  const [showInserimentoPolizza, setShowInserimentoPolizza] = useState(false);
  const [polizza,setPolizza] = useState()
  const [valueRegione, setValueRegione] = useState(null)
  const [valueNazione, setValueNazione] = useState(null)
  const [valueProvincia, setValueProvincia] = useState(null);
  const [province, setProvince] = useState([]);


  const handleSubmitForm = (client, values) => {
    if (!client) {
      submitForm(values)
        .then(data => {
  
          updateClient(data); // Aggiorna lo stato `client` utilizzando la funzione callback
        })
        .catch(error => console.error('Error:', error));
    } else {
      alert("fatto");
    }
  }

  const handleShowInserimentoPolizza = ()=>{
    setShowInserimentoPolizza(true)
  }

  function getValueFromLabel(label) {
    // Trova l'indice dell'oggetto nell'array che ha la label corrispondente
    const index = regioniItaliane.findIndex(regione => regione.label === label);
    // Trova l'oggetto nell'array che ha la label corrispondente
    const regione = regioniItaliane.find(regione => regione.label === label);
    // Se l'oggetto è stato trovato, ritorna il suo valore. Altrimenti, ritorna null.
    if(regione){
      setProvince(provincePerRegione[index][regione.value])
    }else{
      setProvince([])
    }
  }

  useEffect(()=>{
    if(client && client.polizza) {
      if (typeof client.polizza === 'string') {
        try {
          const polizzaObject = JSON.parse(client.polizza);
          setPolizza(polizzaObject);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    }
  },[client])


    return (
      <>
      {!showInserimentoPolizza &&
      <form onSubmit={form.onSubmit((values) => {
        handleSubmitForm(client,values)
})}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <TextInput
          label="Cognome"
          value={client?.cognome}
          {...form.getInputProps('cognome')}
          error={form.errors.cognome}
        />
        <TextInput
          label="Nome"
          value={client?.nome}
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

      <DatePickerInput
        placeholder=" Data di nascita "
        label=" Data Di nascita "
        withAsterisk
        value={client?.['dataDiNascita'] ? new Date(client?.['dataDiNascita']) : null}
        {...form.getInputProps(client?.['dataDiNascita'] ? new Date(client?.['dataDiNascita']) : null)}
        error={form.errors.scadenza}
        />

       <div>
       <TextInput
          label="Luogo"
          value={client?.luogo}
          {...form.getInputProps('luogo')}
          error={form.errors.luogo}
        />
     
        <Select label="Nazione" value={client?.nazione ? client?.nazione : valueNazione } 
          onChange={setValueRegione} data={nazioniDelMondo} {...form.getInputProps('nazione')} 
          error={form.errors.nazione} />

           <div style={{display:"flex",alignItems:"flex-end"}}>
        <TextInput
          label="Codice fiscale"
          value={client?.codiceFiscale}
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
          value={client?.indirizzo}
          {...form.getInputProps('indirizzo')}
          error={form.errors.indirizzo}
        />
    
      <Select
      label="Regione"
      onSelect={(e)=>{getValueFromLabel(e.target.value);setValueRegione([])}}
      value={client?.regione}
      data={regioniItaliane}
      {...form.getInputProps('regione')}
      error={form.errors.regione}
      />

        <Select
          label="Provincia"
          value={client?.provincia ? client?.provincia : valueProvincia}
          onChange={(selectedProvincia) => setValueProvincia(selectedProvincia)}
          data={province}
          disabled={!valueRegione}
          {...form.getInputProps('provincia')}
          error={form.errors.provincia}
        />
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <TextInput
          label="Comune"
          value={client?.comune}
          {...form.getInputProps('comune')}
          error={form.errors.comune}
        />
        <TextInput
          label="Cap"
          value={client?.cap}
          {...form.getInputProps('cap')}
          error={form.errors.cap}
        />
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <TextInput
          label="Telefono(1)"
          value={client?.telefono1}
          {...form.getInputProps('telefono1')}
          error={form.errors.telefono1}
        />
        <TextInput
          label="Telefono(2)"
          value={client?.telefono2}
          {...form.getInputProps('telefono2')}
          error={form.errors.telefono2}
        />
        <TextInput
          label="Email"
          value={client?.email}
          {...form.getInputProps('email')}
          error={form.errors.email}
        />
        </div>
        <Group position="right" mt="md">
          {
            !client && <><Button type="reset">Reset</Button>
            <Button type="submit">Invia</Button></>
          }
          {
            client && <>
            <Button color='red' type="submit" >Modifica</Button>
            <Button color='blue' type="reset" onClick={handleShowInserimentoPolizza}>Inserisci nuova polizza</Button>
            </>
          }
          
        </Group>
      </form>
      }
      {showInserimentoPolizza && <InserimentoPolizzaForm client={client}/>}

      {!showInserimentoPolizza && client?.polizza &&
      <Box display={"flex"} style={{gap:"20px",marginTop:"10px",padding:"10px 20px",backgroundColor:"rgb(240, 240, 240)",borderRadius:"15px",border:"1px solid rgb(175, 175, 175)"}}>
      <div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Punto Vendita:</span> <span>{polizza?.compagnia}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Polizza:</span> <span>{polizza?.polizza}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Prodotto:</span> <span>{polizza?.prodotto}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Targa:</span> <span>{polizza?.targa}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Effetto:</span> <span>{polizza?.effetto}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Scadenza:</span> <span>{polizza?.scadenza}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Premio:</span> <span>{polizza?.premio}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Commissioni:</span> <span>{polizza?.commissioni}</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Totale:</span> <span>{polizza?.totale + polizza?.premio }</span> </div>
<div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Rata:</span> <span>{polizza?.totale + polizza?.premio }</span> </div>
      </Box> 
      }
      </>
    );
  }