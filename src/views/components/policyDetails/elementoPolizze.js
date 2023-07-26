import React from 'react';
import { Paper, Grid, Col, Text } from '@mantine/core';



export const ItemPolizza = ({ polizza }) => {

  console.log( parseInt(polizza.premio) , parseInt(polizza.commissioni))

  let premio = parseInt(polizza.premio)
  let commissioni = parseInt(polizza.commissioni)
  let totale = parseInt(polizza.totale)

  return (
    <Paper 
  padding="md" 
  radius="md" 
  shadow="xs" 
  miw={600}
  style={{ 
    marginTop: 10, 
    backgroundColor: '#f9f9f9', 
    border: '1px solid black' 
  }}
>
  {polizza.nome && (
    <Grid gutter="md" style={{ marginBottom: 10 }}>
      <Col span={6}>
        <Text weight={500} color="gray">Nome:</Text>
        <Text>{polizza?.nome}</Text>
      </Col>
      <Col span={6}>
        <Text weight={500} color="gray">Cognome:</Text>
        <Text>{polizza?.cognome}</Text>
      </Col>
    </Grid>
  )}

  <Grid gutter="md" style={{ marginBottom: 10 }}>
    <Col span={4}>
      <Text weight={500} color="gray">Punto Vendita:</Text>
      <Text>{polizza?.compagnia}</Text>
    </Col>
    <Col span={4}>
      <Text weight={500} color="gray">Polizza:</Text>
      <Text>{polizza?.polizza}</Text>
    </Col>
    <Col span={4}>
      <Text weight={500} color="gray">Prodotto:</Text>
      <Text>{polizza?.prodotto}</Text>
    </Col>
  </Grid>

  <Grid gutter="md" style={{ marginBottom: 10 }}>
    <Col span={4}>
      <Text weight={500} color="gray">Targa:</Text>
      <Text>{polizza?.targa}</Text>
    </Col>
    <Col span={4}>
      <Text weight={500} color="gray">Effetto:</Text>
      <Text>{polizza?.effetto}</Text>
    </Col>
    <Col span={4}>
      <Text weight={500} color="gray">Scadenza:</Text>
      <Text>{polizza?.scadenza}</Text>
    </Col>
  </Grid>

  <Grid gutter="md">
    <Col span={3}>
      <Text weight={500} color="gray">Premio:</Text>
      <Text>{polizza?.premio}</Text>
    </Col>
    <Col span={3}>
      <Text weight={500} color="gray">Commissioni:</Text>
      <Text>{polizza?.commissioni}</Text>
    </Col>
    <Col span={3}>
      <Text weight={500} color="gray">Totale:</Text>
      <Text>{commissioni + premio}</Text>
    </Col>
    <Col span={3}>
      <Text weight={500} color="gray">Rata:</Text>
      <Text>{commissioni + premio}</Text>
    </Col>
  </Grid>
</Paper>
  )
  
};
