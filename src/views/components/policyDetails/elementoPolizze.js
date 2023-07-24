import React from 'react';
import { TextInput, Button, Group, Radio , Box } from '@mantine/core';


const ItemPolizza = ({ polizza }) => (
  <Box display={"flex"} style={{gap:"20px",marginTop:"10px",padding:"10px 20px",backgroundColor:"rgb(240, 240, 240)",borderRadius:"15px",border:"1px solid rgb(175, 175, 175)"}}>
    {polizza.nome && <><div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Nome:</span> <span>{polizza?.nome}</span> </div>
    <div style={{display:"flex",flexDirection:"column"}}> <span style={{fontWeight:"bold"}}>Cognome:</span> <span>{polizza?.cognome}</span> </div></>
    }
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
);

export default ItemPolizza;