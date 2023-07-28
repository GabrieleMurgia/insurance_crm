import React, { useState } from 'react';
import { Paper, Grid, Col, Text, TextInput, Button } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function EditPolizza() {
  const location = useLocation();
  const polizza = location.state ? location.state.polizza : {};
  const [editedPolizza, setEditedPolizza] = useState(polizza);
  const navigate = useNavigate();

  const handleReturnToForm = () => {
    navigate('/form');
  };

  const handleChange = (event) => {
    setEditedPolizza({
      ...editedPolizza,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* placeholder */
    try {
      // Chiama la funzione updateClientPolizza con l'ID del cliente e i valori del form
      await updateClientPolizza(polizza.id, editedPolizza);
      console.log('Polizza updated successfully.');
      navigate('/form'); // Reindirizza l'utente al form dopo l'aggiornamento della polizza
    } catch (error) {
      console.error('Error updating polizza:', error);
    }
  };

  return (
    <Paper padding="lg" radius="md" shadow="sm">
      <form onSubmit={handleSubmit}>
        <Grid gutter="md">
          <Col span={6}>
            <Text weight={500} color="gray">Nome:</Text>
            <TextInput
              name="nome"
              value={editedPolizza.nome}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Cognome:</Text>
            <TextInput
              name="cognome"
              value={editedPolizza.cognome}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Punto Vendita:</Text>
            <TextInput
              name="compagnia"
              value={editedPolizza.compagnia}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Polizza:</Text>
            <TextInput
              name="polizza"
              value={editedPolizza.polizza}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Prodotto:</Text>
            <TextInput
              name="prodotto"
              value={editedPolizza.prodotto}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Targa:</Text>
            <TextInput
              name="targa"
              value={editedPolizza.targa}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Effetto:</Text>
            <TextInput
              name="effetto"
              value={editedPolizza.effetto}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Scadenza:</Text>
            <TextInput
              name="scadenza"
              value={editedPolizza.scadenza}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Premio:</Text>
            <TextInput
              name="premio"
              value={editedPolizza.premio}
              onChange={handleChange}
            />
          </Col>
          <Col span={6}>
            <Text weight={500} color="gray">Commissioni:</Text>
            <TextInput
              name="commissioni"
              value={editedPolizza.commissioni}
              onChange={handleChange}
            />
          </Col>
        </Grid>

        <Button type="submit">Aggiorna</Button>
        <Button onClick={handleReturnToForm}>Ritorna al Form</Button>
      </form>
    </Paper>
  );
}