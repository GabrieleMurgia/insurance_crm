import React from 'react';
import { Paper, Grid, Col, Text } from '@mantine/core';

export const ItemPolizza = ({ polizza }) => {

  let premio = parseInt(polizza.premio)
  let commissioni = parseInt(polizza.commissioni)
  let totale = parseInt(polizza.totale)

  return (
    <Paper 
      maw={300}
      padding="lg" 
      radius="md" 
      shadow="sm" 
      style={{ 
        marginTop: 10, 
        backgroundColor: '#f9f9f9', 
        border: '1px solid #e8e8e8' 
      }}
    >
      {polizza.nome && (
        <Grid gutter="md" style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Text weight={500} color="gray">Nome:</Text>
            <Text style={{fontSize:"15px",fontWeight:"lighter"}}>{polizza?.nome}</Text>
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Cognome:</Text>
            <Text style={{fontSize:"15px",fontWeight:"lighter"}}>{polizza?.cognome}</Text>
          </Col>
        </Grid>
      )}

      <Grid gutter="md" style={{ marginBottom: 10 }}>
        <Col span={4}>
          <Text weight={500} color="gray">Punto Vendita:</Text>
          <Text fs={"60%"} style={{fontSize:"10px",fontWeight:"lighter", wordWrap: "break-word"}}>{polizza?.compagnia}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Polizza:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter", wordWrap: "break-word"}}>{polizza?.polizza}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Prodotto:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter", wordWrap: "break-word"}}>{polizza?.prodotto}</Text>
        </Col>
      </Grid>

      <Grid gutter="md" style={{ marginBottom: 10 }}>
        <Col span={4}>
          <Text weight={500} color="gray">Targa:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter", wordWrap: "break-word"}}>{polizza?.targa}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Effetto:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter", wordWrap: "break-word"}}>{polizza?.effetto}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Scadenza:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter", wordWrap: "break-word"}}>{new Date(polizza?.scadenza).toISOString().split('T')[0]}</Text>
        </Col>
      </Grid>

      <Grid gutter="md">
        <Col span={4}>
          <Text weight={500} color="gray">Premio:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter"}}>{polizza?.premio}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Commissioni:</Text>
          <Text style={{fontSize:"10px",fontWeight:"lighter"}}>{polizza?.commissioni}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Totale:</Text>
          <Text style={{fontSize:"10px"}}>{commissioni + premio}</Text>
        </Col>
        <Col span={4}>
          <Text weight={500} color="gray">Rata:</Text>
          <Text style={{fontSize:"10px"}}>{commissioni + premio}</Text>
        </Col>
      </Grid>
    </Paper>
  )
  
};