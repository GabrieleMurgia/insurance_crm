import { TextInput, Button, Group } from '@mantine/core';

export function RicercaPolizzaForm({ form }) {
  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div style={{display:"flex"}}>
        <TextInput
        label="Cognome"
        {...form.getInputProps('cognome')}
      />
      <TextInput
        label="Nome"
        {...form.getInputProps('nome')}
      />
        </div>
      <TextInput
        label="Targa"
        {...form.getInputProps('targa')}
      />
      <TextInput
        label="Polizza"
        {...form.getInputProps('polizza')}
      />
      <TextInput
        label="Punto vendita"
        {...form.getInputProps('puntoVendita')}
      />
      <TextInput
        label="Compagnia"
        {...form.getInputProps('compagnia')}
      />
      <Group position="right" mt="md">
        <Button type="reset">Reset</Button>
        <Button type="submit">Ricerca</Button>
      </Group>
    </form>
  );
}