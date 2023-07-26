import { Box } from '@mantine/core';
import { RicercaClienteForm } from './forms/RicercaClienteForm';
import { InserimentoNuovoClienteForm } from './forms/InserimentoNuovoClienteForm';
import { RicercaPolizzaForm } from './forms/RicercaPolizzaForm';
import { PolizzeInScadenzaForm } from './forms/PolizzeInScadenzaForm';
import { RateInScadenzaForm } from './forms/RateInScadenzaForm';
import { useFormConfiguration } from '../../../utils/useFormConfiguration';


export function FormBody({type}) {

 const formRicercaCliente = useFormConfiguration({type: "Ricerca Cliente"})
 const formRicercaPolizza = useFormConfiguration({type: "Ricerca Polizza"})
 const formPolizzeInScadenza = useFormConfiguration({type: "Polizze In Scadenza"})
 const formRateInScadenza = useFormConfiguration({type: "Rate In Scadenza"})
 const form = useFormConfiguration("")


  return (
   <>
    <h2>{type}</h2>
    <Box mx="auto" style={{display:"flex",justifyContent:"center"}}>
     {type === "Ricerca Cliente" && <RicercaClienteForm form={formRicercaCliente} />}
      {type === "Inserimento Nuovo Cliente" && <InserimentoNuovoClienteForm />}
      {type === "Ricerca Polizza" && <RicercaPolizzaForm form={formRicercaPolizza} />}
      {type === "Polizze in Scadenza" && <PolizzeInScadenzaForm form={formPolizzeInScadenza} />}
      {type === "Rate in Scadenza" && <RateInScadenzaForm form={formRateInScadenza} />}
    </Box>
   </>
  );
}

