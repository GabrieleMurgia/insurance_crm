import { Button, Group } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { MonthPickerInput } from '@mantine/dates';

export function RateInScadenzaForm({ form }) {

    return (
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <YearPickerInput
        label="Seleziona Anno"
        placeholder="Seleziona Anno"
        value={form.values.year}
        onChange={(date) => form.setFieldValue('year', date)}
        error={form.errors.year}
        mx="auto"
        maw={400}
      />

      <MonthPickerInput
        label="Seleziona Mese"
        placeholder="Seleziona Mese"
        value={form.values.month}
        onChange={(date) => form.setFieldValue('month', date)}
        error={form.errors.month}
        mx="auto"
        maw={400}
      />
        <Group position="right" mt="md">
          <Button type="submit">Estrai</Button>
        </Group>
      </form>
    );
  }