import { useForm } from "@mantine/form";
import { useEffect, useMemo } from "react";

export function useFormConfiguration({type , client}) {
  
  const formInserimentoConfig = useMemo(() => ({
    initialValues: client || {
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
  }), [client]);

  const formInserimentoPolizzaConfig = useMemo(() => ({
    initialValues: {
      puntoVendita: '',
      compagnia: '',
      polizza: '',
      prodotto: '',
      targa: '',
      periodicità: '',
      effetto: '',
      scadenza: '',
      premio: '',
      commissioni: '',
      autocontrollo: '',
      stato: '',
      attiva: '',
      sospensione: '',
      motivoSospensione: '',
      note: '',
    },
  
    validate: {
      /* da fare */
     /*  puntoVendita: (value) => (!value ? 'Campo obbligatorio' : null),
      compagnia: (value) => (!value ? 'Campo obbligatorio' : null),
      polizza: (value) => (!value ? 'Campo obbligatorio' : null),
      prodotto: (value) => (!value ? 'Campo obbligatorio' : null),
      targa: (value) => (!value ? 'Campo obbligatorio' : null),
      periodicità: (value) => (!value ? 'Campo obbligatorio' : null),
      effetto: (value) => (!value ? 'Campo obbligatorio' : null),
      scadenza: (value) => (!value ? 'Campo obbligatorio' : null),
      premio: (value) => (!value ? 'Campo obbligatorio' : null),
      commissioni: (value) => (!value ? 'Campo obbligatorio' : null),
      autocontrollo: (value) => (!value ? 'Campo obbligatorio' : null),
      stato: (value) => (!value ? 'Campo obbligatorio' : null),
      attiva: (value) => (!value ? 'Campo obbligatorio' : null),
      sospensione: (value) => (!value ? 'Campo obbligatorio' : null),
      motivoSospensione: (value) => (!value ? 'Campo obbligatorio' : null),
      note: (value) => (!value ? 'Campo obbligatorio' : null), */
    },
  }), []);

  const formDefaultConfig = useMemo(() => ({
    initialValues: {
      email: '',
    },
  
    validate: {
      email: (value) => (!value ? 'Campo obbligatorio' : null),
    },
  }), [])

  const formRicercaClienteConfig = useMemo(() => ({
    initialValues: {
      cognome: '',
      codiceFiscale:'',
    },
  
    validate: {
      cognome: (value) => (!value ? 'Campo obbligatorio' : null),
      
    },
  }), []);

  const formInserimento = useForm(formInserimentoConfig);
  const formInserimentoPolizza = useForm(formInserimentoPolizzaConfig);
  const formDefault = useForm(formDefaultConfig);
  const formRicercaCliente = useForm(formRicercaClienteConfig);

  useEffect(() => {
    if (client) {
      formInserimento.reset(client);
    }
  }, [client]);


  if(type === "Inserimento Nuovo Cliente"){
    return formInserimento
  }else if(type === "Ricerca Cliente"){
    return formRicercaCliente
  } else if(type === "Inserimento Nuova polizza"){
    return formInserimentoPolizza
  } 
  else{
    return formDefault
  }
}