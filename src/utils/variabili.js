import axios from 'axios';
export const linksHeader = [
    {
      label: 'Clienti',
      link: '/clienti',
      links: [
        {
          label: 'Ricerca Cliente',
          link: '/clienti/sotto-link-1',
        },
        {
          label: 'Inserimento Nuovo Cliente',
          link: '/clienti/sotto-link-2',
        },
      ],
    },
    {
      label: 'Portafoglio',
      link: '/portafoglio',
      links: [
        {
          label: 'Ricerca Polizza',
          link: '/clienti/sotto-link-1',
        },
      ],
    },
    {
      label: 'Contabilità',
      link: '/contabilità',
      links: [
        {
          label: 'Polizze in Scadenza',
          link: '/clienti/sotto-link-1',
        },
        {
          label: 'Rate in Scadenza',
          link: '/clienti/sotto-link-2',
        },
      ],
    },
  ];

