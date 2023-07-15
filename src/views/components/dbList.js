import { useEffect, useState } from "react";
import { deleteClient, getForms, searchClients } from "../../services/dbRequests";
import { Box, Text, Badge, Button } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import { IconZoomIn } from "@tabler/icons-react";
import { InserimentoNuovoClienteForm } from "./FormBody/forms/InserimentoNuovoClienteForm";

export function DbList({filter , resetFilter , handleShowClientModule}) {

  const [clients,setClients] = useState()
  const [selectedClient, setSelectedClient] = useState(null)

  const handleClientSelect = (client) => {
    console.log(client)
    return
  }

  const removeClient = (id)=>{
      console.log(id)
      deleteClient(id).then(data => setClients(data))
      .catch(error => console.error('Error:', error));
  }

  useEffect(()=>{
    if(!filter){
      getForms()
      .then(data => setClients(data))
      .catch(error => console.error('Error:', error))
    } else {
        searchClients(filter.cognome,filter.codiceFiscale).then(data => {
          setClients(data);
          console.log(data)
          
        })
        .catch(error => console.error('Error:', error));
      }
  },[filter]) // Remove 'clients' from the dependencies

    return (
        <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"}}>
              {!selectedClient && <ScrollArea w={"90%"} h={510} >
        {Array.isArray(clients) && clients.map((client)=>{
            return (
              <Box key={client.id}  sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                width:"100%",
                justifySelf:"center",
                border:"1px solid black",
                marginLeft:"20vw",
        
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
              })} padding="md" marginBottom="md" shadow="xs" style={{width:"50%",display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",borderBottom:"1px solid gray"}}>
                <Badge size="xl" color="blue" style={{ alignSelf:"start" }}>{client.id}</Badge>
                <Text fw={"bold"} size={"xl"}>{client.nome} {client.cognome}</Text> 
                <Button color="red" style={{ alignSelf:"end" }} onClick={()=>{removeClient(client.id)}}>Rimuovi</Button>
                </div>
                <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
                <Button  color="green" onClick={() => handleShowClientModule()}><IconZoomIn/></Button>
                <Text size={"l"}><span style={{fontWeight:"bold"}}>Codice Fiscale:</span> {client.codiceFiscale}</Text> 
                <Text> <span style={{fontWeight:"bold"}}>Data di nascita:</span> {new Date(client.dataDiNascita).toLocaleDateString()}</Text>
                </div>
              </Box>
            )
        })}
        </ScrollArea>}
      
    </div>
    )
    
}