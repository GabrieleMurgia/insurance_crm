const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors'); // Importa il modulo cors

const app = express();
app.use(cors()); // Usa il middleware cors
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const formValues = req.body;

  // Recupera l'array esistente di polizze
  db.get('SELECT polizza FROM formTable WHERE id = ?', [formValues.id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Error retrieving existing policies.' });
    } else {
      // Analizza l'array di polizze dal database
      let existingPolicies = JSON.parse(row.polizza || '[]');

      // Aggiungi la nuova polizza all'array
      existingPolicies.push(formValues.polizza);

      // Inserisci l'array aggiornato nel database
      db.run(`UPDATE formTable SET polizza = ? WHERE id = ?`,
        [JSON.stringify(existingPolicies), formValues.id],
        function(err) {
          if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Error updating policies.' });
          } else {
            console.log(`Policies for client with id ${formValues.id} have been updated.`);
            res.json({ message: 'Form submitted successfully.' });
          }
        }
      );
    }
  });
});

app.get('/get-forms', (req, res) => {
  db.all('SELECT * FROM formTable', [], (err, rows) => {
    if (err) {
      throw err;
    }
    // Analizza l'array di polizze per ogni riga
    rows.forEach(row => {
      row.polizza = JSON.parse(row.polizza || '[]');
    });
    res.json(rows); // Invia i risultati come risposta JSON
  });
});

  app.get('/search-clients', (req, res) => {
    const { cognome, codiceFiscale } = req.query;
  
    let query = 'SELECT * FROM formTable WHERE 1=1';
    let params = [];
  
    if (cognome) {
      query += ' AND cognome LIKE ?';
      params.push(`%${cognome}%`); // Aggiunge il carattere jolly "%" prima e dopo il cognome per cercare qualsiasi cognome che contenga la stringa di ricerca
    }
  
    if (codiceFiscale) {
      query += ' AND codiceFiscale LIKE ?';
      params.push(`%${codiceFiscale}%`);
    }
  
    db.all(query, params, (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows); // Invia i risultati come risposta JSON
    });
  });

  

  app.delete('/reset-db', (req, res) => {
    db.run('DELETE FROM formTable', function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error resetting database.' });
      } else {
        console.log(`Deleted ${this.changes} rows.`);
        res.json({ message: 'Database reset successfully.' });
      }
    });
  });

  app.delete('/delete-client', (req, res) => {
    const id = req.body.id; // Ottieni l'ID dal corpo della richiesta
    console.log(id)
    db.run(`DELETE FROM formTable WHERE id = ?`, id, function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error deleting client.' });
      } else {
        console.log(`Client with id ${id} has been deleted.`);
        res.json({ message: 'Client deleted successfully.' });
      }
    });
  });

  app.put('/update-client-polizza', (req, res) => {
    const { id, polizzaValues } = req.body;
  
    // Convert the form values to a JSON string
    const polizzaJson = JSON.stringify(polizzaValues);
  
    // Update the client record in the database
    db.run(`UPDATE formTable SET polizza = ? WHERE id = ?`, [polizzaJson, id], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error updating client.' });
      } else {
        console.log(`Client with id ${id} has been updated.`);
        res.json({ message: 'Client updated successfully.' });
      }
    });
  });

    app.get('/search-by-date', (req, res) => {
    const { year, month } = req.query;
  
    let query = 'SELECT * FROM formTable WHERE 1=1';
    let params = [];

    if (year) {
      query += ' AND strftime("%Y", json_extract(polizza, "$.scadenza")) = ?';
      params.push(year);
    }


    if (month) {
      let formattedMonth = month.padStart(2, '0'); // Aggiunge uno zero iniziale se necessario
      query += ' AND strftime("%m", json_extract(polizza, "$.scadenza")) = ?';
      params.push(formattedMonth);
    }
  
    db.all(query, params, (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows); // Send the results as JSON response
    });
  });

app.listen(3001, () => console.log('Server listening on port 3001'));