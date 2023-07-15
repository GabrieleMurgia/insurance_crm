import { TextInput, Button, Group } from '@mantine/core';
export function PolizzeInScadenzaForm({ form }) {
    return (
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Anno"
          {...form.getInputProps('anno')}
        />
        <TextInput
          label="Mese"
          {...form.getInputProps('mese')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Estrai</Button>
        </Group>
      </form>
    );
  }