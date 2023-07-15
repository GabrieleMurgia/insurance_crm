import { Box } from '@mantine/core';
import { RicercaClienteForm } from './forms/RicercaClienteForm';
import { InserimentoNuovoClienteForm } from './forms/InserimentoNuovoClienteForm';
import { RicercaPolizzaForm } from './forms/RicercaPolizzaForm';
import { PolizzeInScadenzaForm } from './forms/PolizzeInScadenzaForm';
import { RateInScadenzaForm } from './forms/RateInScadenzaForm';
import { useFormConfiguration } from '../../../utils/useFormConfiguration';


export function FormBody({type}) {

 const formInserimento = useFormConfiguration({type: "Inserimento Nuovo Cliente"})
 const formRicercaCliente = useFormConfiguration({type: "Ricerca Cliente"})

 const form = useFormConfiguration("")


  return (
   <>
    <h2>{type}</h2>
    <Box mx="auto" style={{display:"flex",justifyContent:"center"}}>
     {type === "Ricerca Cliente" && <RicercaClienteForm form={formRicercaCliente} />}
      {type === "Inserimento Nuovo Cliente" && <InserimentoNuovoClienteForm form={formInserimento} />}
      {type === "Ricerca Polizza" && <RicercaPolizzaForm form={form} />}
      {type === "Polizze in Scadenza" && <PolizzeInScadenzaForm form={form} />}
      {type === "Rate in Scadenza" && <RateInScadenzaForm form={form} />}
    </Box>
   </>
  );
}

