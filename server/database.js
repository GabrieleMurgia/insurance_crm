const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./myDatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the myDatabase database.');
});

db.run(`CREATE TABLE IF NOT EXISTS formTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  cognome TEXT,
  sesso TEXT,
  dataDiNascita TEXT,
  luogo TEXT,
  nazione TEXT,
  indirizzo TEXT,
  regione TEXT,
  provincia TEXT,
  comune TEXT,
  cap TEXT,
  telefono1 TEXT,
  telefono2 TEXT,
  email TEXT,
  codiceFiscale TEXT
)`);

module.exports = db;