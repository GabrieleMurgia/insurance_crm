import { TextInput, Button, Group, Radio , Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import { submitForm } from '../../../../services/dbRequests';
import { useFormConfiguration } from '../../../../utils/useFormConfiguration';
import { InserimentoPolizzaForm } from './InserimentoPolizza';
import { DatePickerInput } from '@mantine/dates';
import { nazioniDelMondo, provincePerRegione, regioniItaliane } from '../../../../utils/variabili';
import { Select } from '@mantine/core';
import { ItemPolizza } from '../../policyDetails/ItemPolizza';
import { ScrollArea } from '@mantine/core';
import { toast } from 'react-hot-toast';


export function InserimentoNuovoClienteForm({client , updateClient}) {

  const form = useFormConfiguration({type: "Inserimento Nuovo Cliente",client});
  const [errorMessage] = useState('');
  const [showInserimentoPolizza, setShowInserimentoPolizza] = useState(false);
  const [polizze,setPolizze] = useState([])
  const [valueRegione, setValueRegione] = useState(null)
  const [valueNazione, setValueNazione] = useState(null)
  const [valueProvincia, setValueProvincia] = useState(null);
  const [province, setProvince] = useState([]);
  const [showForm,setShowForm] = useState(true)


  const handleSubmitForm = (client, values) => {
   
    if (!client) {
      if(values.polizza){
        submitForm(values)
        .then(data => {
          if(updateClient)updateClient(data); // Aggiorna lo stato `client` utilizzando la funzione callback
          toast.success('operazione riuscita!')
        })
        .catch(error => {toast.error("Operazione Fallita")});
      }else{
        submitForm({...values,polizza:""})
        .then(data => {
          if(updateClient)updateClient(data); // Aggiorna lo stato `client` utilizzando la funzione callback
          toast.success('operazione riuscita!')
        })
        .catch(error => {toast.error("Operazione Fallita")});
      }
    } else if(client) {
      console.log(values)
      submitForm(values)
      .then(data => {
        if(updateClient)updateClient(data); // Aggiorna lo stato `client` utilizzando la funzione callbac
        toast.success('operazione riuscita!')
      })
      .catch(error => {toast.error("Operazione Fallita")});
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

/*   useEffect(()=>{
    let tempArray = []
    if(client && client.polizza[0] !== "") {
      try {
        const polizzeData = JSON.parse(JSON.parse(client.polizza))
        tempArray.push(polizzeData)
        if(Array.isArray(polizzeData)){
          setPolizze(polizzeData);
        }else{
          setPolizze(tempArray);
        }
      } catch (error) {
        // Log any error during parsing
        console.error('Error parsing JSON:', error);
      }
    }
  },[client]) */

  useEffect(() => {
    if (client?.['dataDiNascita']) {
      const date = new Date(client?.['dataDiNascita']);
      form.setFieldValue('dataDiNascita', new Date(date));
    }
  }, [client]);
  

  const resetForm = () => {
    form.setFieldValue('cognome', '');
    form.setFieldValue('nome', '');
    form.setFieldValue('sesso', '');
    form.setFieldValue('dataDiNascita', null);
    form.setFieldValue('luogo', '');
    form.setFieldValue('nazione', '');
    form.setFieldValue('codiceFiscale', '');
    form.setFieldValue('indirizzo', '');
    form.setFieldValue('regione', '');
    form.setFieldValue('provincia', '');
    form.setFieldValue('comune', '');
    form.setFieldValue('cap', '');
    form.setFieldValue('telefono1', '');
    form.setFieldValue('telefono2', '');
    form.setFieldValue('email', '');
  };

// Funzione per estrarre le consonanti da una stringa
function extractConsonants(str) {
  return str.toUpperCase().split('').filter(char => 'BCDFGHJKLMNPQRSTVWXYZ'.includes(char));
}

// Funzione per generare il codice fiscale
function generateCodiceFiscale(cognome, nome, dataDiNascita, sesso, luogo) {
  const cognomeConsonants = extractConsonants(cognome);
  const nomeConsonants = extractConsonants(nome);
  const year = dataDiNascita.getFullYear().toString().slice(-2);
  const month = 'ABCDEHLMPRST'.charAt(dataDiNascita.getMonth());
  const day = sesso === 'Femmina' ? dataDiNascita.getDate() + 40 : dataDiNascita.getDate();

  // Genera le prime 6 lettere dal cognome e dal nome
  let codiceFiscale = (cognomeConsonants.slice(0, 3).join('') + nomeConsonants.slice(0, 3).join('')).padEnd(6, 'X');

  // Aggiunge la data di nascita
  codiceFiscale += year + month + day.toString().padStart(2, '0');

  // Aggiunge un codice di comune fittizio
  codiceFiscale += 'Z000';

  // Genera un carattere di controllo fittizio
  const controlChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
  codiceFiscale += controlChar;

  return codiceFiscale;
}



    return (
      <div style={ !showInserimentoPolizza ? {display:"flex"} : {}}>
       { polizze.length > 0 && <Button onClick={()=>{setShowForm(!showForm)}} style={{justifySelf:"end"}}>X</Button>}
      {!showInserimentoPolizza && showForm && (
        <form onSubmit={form.onSubmit((values) => handleSubmitForm(client,values))}>
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
  value={form.values.dataDiNascita ? new Date(form.values.dataDiNascita) : null}
  onChange={(date) => form.setFieldValue('dataDiNascita', new Date(date))}
  error={form.errors.dataDiNascita}
/>
    
            <div>
              <TextInput
                label="Luogo"
                value={client?.luogo}
                {...form.getInputProps('luogo')}
                error={form.errors.luogo}
              />
    
              <Select 
                label="Nazione" 
                value={client?.nazione ? client?.nazione : valueNazione } 
                onChange={setValueRegione} 
                data={nazioniDelMondo} 
                {...form.getInputProps('nazione')} 
                error={form.errors.nazione} 
              />
    
              <div style={{display:"flex",alignItems:"flex-end"}}>
                <TextInput
                  label="Codice fiscale"
                  value={client?.codiceFiscale}
                  {...form.getInputProps('codiceFiscale')}
                  error={form.errors.codiceFiscale}
                />
               <Button mt={24} onClick={() => {
  const codiceFiscale = generateCodiceFiscale(
    form.values.cognome,
    form.values.nome,
    form.values.dataDiNascita,
    form.values.sesso,
    form.values.luogo
  );
  form.setFieldValue('codiceFiscale', codiceFiscale);
}}>Genera</Button>
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
            {!client && (
              <>
                <Button type="reset" onClick={resetForm}>Reset</Button>
                <Button type="submit">Invia</Button>
              </>
            )}
            {client && (
              <>
                <Button color='red' type="submit">Modifica</Button>
                <Button color='blue' type="reset" onClick={handleShowInserimentoPolizza}>Inserisci Polizza</Button>
              </>
            )}
          </Group>
        </form>
      )}
    
      {showInserimentoPolizza && <InserimentoPolizzaForm client={client}/>}
    
      {polizze.length > 0 && !showInserimentoPolizza && polizze && (
       <div>
         {client?.nome && <span style={{fontWeight:"bold"}}>Polizze di {client?.nome} {client?.cognome}</span> }
          <ScrollArea style={{alignSelf:"center"}} ml={showForm ? 50 : 0} h={showForm ? 500 : 500}>
            {polizze.map((polizza, index) => (
              <ItemPolizza  polizza={polizza}/>
            ))}
          </ScrollArea>
       </div>
      )}
    </div>
    );
  }