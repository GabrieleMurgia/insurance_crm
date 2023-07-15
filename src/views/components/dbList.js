import { useEffect, useState } from "react";
import { deleteClient, getForms, searchClients } from "../../services/dbRequests";
import { Box, Text, Badge, Button } from '@mantine/core';
import { ScrollArea } from '@mantine/core';

export function DbList({filter , resetFilter}) {

  const [clients,setClients] = useState()

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
              <ScrollArea w={"90%"} h={510} >
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
                <div style={{display:"flex",justifyContent:"center"}}>
                <Text fw={"bold"} size={"l"}>{client.codiceFiscale}</Text> 
                </div>
                <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
                <Text> <span style={{fontWeight:"bold"}}>Data di nascita:</span> {new Date(client.dataDiNascita).toLocaleDateString()}</Text>
                <Text><span style={{fontWeight:"bold"}}>Sesso:</span> {client.sesso}</Text>
                </div>
                
               
                <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
               <Text><span style={{fontWeight:"bold"}}>Email:</span> {client.email}</Text>
                <Text><span style={{fontWeight:"bold"}}>Telefono:</span> {client.telefono1}</Text>
                <Text><span style={{fontWeight:"bold"}}>Telefono 2:</span> {client.telefono2}</Text>
               </div>
              
               <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
               <Text><span style={{fontWeight:"bold"}}>Luogo di nascita:</span> {client.luogo}</Text>
                <Text><span style={{fontWeight:"bold"}}>Nazione:</span> {client.nazione}</Text>
               </div>
                
               <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
               <Text><span style={{fontWeight:"bold"}}>Indirizzo:</span> {client.indirizzo}</Text>
                <Text><span style={{fontWeight:"bold"}}>Regione:</span> {client.regione}</Text>
                <Text><span style={{fontWeight:"bold"}}>Provincia:</span> {client.provincia}</Text>
               </div>

               <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
               <Text><span style={{fontWeight:"bold"}}>Comune:</span> {client.comune}</Text>
                <Text><span style={{fontWeight:"bold"}}>CAP:</span> {client.cap}</Text>
               </div>
               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",borderTop:"1px solid gray"}}>
                
               </div>
              </Box>
            )
        })}
        </ScrollArea>
    </div>
    )
    
}