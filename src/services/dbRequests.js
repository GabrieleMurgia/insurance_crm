import axios from 'axios';

const API_URL = 'http://localhost:3001';

export function submitForm(values) {
  console.log("EWAI")
  return axios.post(`${API_URL}/submit-form`, values)
    .then(response => response.data)
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export function getForms() {
  return axios.get(`${API_URL}/get-forms`)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
}

export function resetForms() {
  return axios.delete(`${API_URL}/reset-db`)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
}

export function deleteClient(id) {
  return axios.delete(`${API_URL}/delete-client`, { data: { id: id } }) // Invia l'ID nel corpo della richiesta
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
}

export function searchClients(cognome, codiceFiscale) {
  console.log("filtro applicato")
  return axios.get(`${API_URL}/search-clients`, {
    params: {
      cognome: cognome,
      codiceFiscale: codiceFiscale,
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('There was an error!', error);
    throw error;
  });
}

export function updateClientPolizza(id, polizzaValues) {
  console.log("ciao")
  return axios.put(`${API_URL}/update-client-polizza`, { id, polizzaValues })
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
}

export function searchByDate(year, month) {
  return axios.get(`${API_URL}/search-by-date`, {
    params: {
      year: year,
      month: month,
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('There was an error!', error);
    throw error;
  });
}
