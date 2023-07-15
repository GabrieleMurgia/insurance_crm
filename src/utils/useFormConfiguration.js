import { useForm } from "@mantine/form";

export function useFormConfiguration({type}) {
  const formInserimento = useForm({
    initialValues: {
      cognome: '',
      nome: '',
      sesso: '',
      luogo: '',
      dataDiNascita:'',
      'provincia-nascita': '',
      nazione: '',
      codiceFiscale: '',
      indirizzo: '',
      regione: '',
      provincia: '',
      comune: '',
      cap: '',
      telefono1: '',
      telefono2: '',
      email: '',
    },
  
    validate: {
      cognome: (value) => (!value ? 'Campo obbligatorio' : null),
      nome: (value) => (!value ? 'Campo obbligatorio' : null),
      sesso: (value) => (!value ? 'Campo obbligatorio' : null),
      luogo: (value) => (!value ? 'Campo obbligatorio' : null),
      dataDiNascita: (value) => (!value ? 'Campo obbligatorio' : null),
      'provincia-nascita': (value) => (!value ? 'Campo obbligatorio' : null),
      nazione: (value) => (!value ? 'Campo obbligatorio' : null),
      codiceFiscale: (value) => (!value ? 'Campo obbligatorio' : null),
      indirizzo: (value) => (!value ? 'Campo obbligatorio' : null),
      regione: (value) => (!value ? 'Campo obbligatorio' : null),
      provincia: (value) => (!value ? 'Campo obbligatorio' : null),
      comune: (value) => (!value ? 'Campo obbligatorio' : null),
      cap: (value) => (!value ? 'Campo obbligatorio' : null),
      telefono1: (value) => (!value ? 'Campo obbligatorio' : null),
      email: (value) => (!value ? 'Campo obbligatorio' : null),
    },
  });

  const formDefault = useForm({
    initialValues: {
      email: '',
    },
  
    validate: {
      email: (value) => (!value ? 'Campo obbligatorio' : null),
    },
  })

  const formRicercaCliente = useForm({
    initialValues: {
      cognome: '',
      codiceFiscale:'',
    },
  
    validate: {
      cognome: (value) => (!value ? 'Campo obbligatorio' : null),
      
    },
  });


  if(type === "Inserimento Nuovo Cliente"){
    return formInserimento
  }else if(type === "Ricerca Cliente"){
    return formRicercaCliente
  } 
  else{
    return formDefault
  }
}