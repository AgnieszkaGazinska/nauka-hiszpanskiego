require('dotenv').config();
const sql = require('mssql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


// Konfiguracja bazy danych
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true
  }
};

// Pobieranie kategorii - GET /api/kategorie
app.get('/api/kategorie', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM kategorie');
    console.log('Kategorie:', result.recordset);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Dodawanie kategorii POST /api/kategorie
app.post('/api/kategorie', async (req, res) => {
  const { nazwa } = req.body;
  if (!nazwa) return res.status(400).json({ error: 'Brak nazwy kategorii' });

  try {
    const pool = await sql.connect(config); 
    await pool.request()
      .input('nazwa', sql.NVarChar(100), nazwa)
      .execute('DodajKategorie');

    res.status(201).json({ message: 'Dodano kategorię' });
  } catch (err) {
    console.error('Błąd dodawania kategorii:', error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});



// Pobieranie słówek - GET /api/slowka
app.get('/api/slowka', async (req, res) => {
  const kategoria = parseInt(req.query.kategoria,10);
  console.log('Pobrano ID kategorii:', kategoria);
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT id, polski, hiszpanski FROM slowka
      WHERE kategoria_id = ${kategoria}
    `;
    console.log('Zwrócone słówka:', result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('Błąd pobierania słówek z bazy:', err);
    res.status(500).send(err.message);
  }
});


// Usuwanie kategorii - DELETE /api/kategorie
app.delete('/api/kategorie/:id/:nazwa', async (req, res) => {
  console.log('Żądanie DELETE:', req.params); 
  const id = parseInt(req.params.id, 10);
  const nazwa = decodeURIComponent(req.params.nazwa);

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('nazwa', sql.NVarChar(100), nazwa)
      .execute('UsunKategorie');

    res.status(200).json({ message: `Kategoria ${nazwa} została usunięta` });
  } catch (err) {
    console.error('Błąd usuwania kategorii:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - edycja kategorii
app.put('/api/kategorie/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const nowaNazwa = req.body.nowaNazwa;

  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input('id', sql.Int, id);
    request.input('nowaNazwa', sql.NVarChar(100), nowaNazwa);

    await request.execute('EdytujKategorie');

    res.json({ success: true, message: 'Kategoria zaktualizowana' });
  } catch (error) {
    console.error('Błąd podczas edycji kategorii:', error);
    res.status(500).json({ success: false, message: 'Błąd podczas edycji kategorii' });
  }
});


//POST - /api/slowka
app.post('/api/slowka', async (req, res) => {
  const { polski, hiszpanski, kategoria_id } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('polski', sql.NVarChar(255), polski)
      .input('hiszpanski', sql.NVarChar(255), hiszpanski)
      .input('kategoria_id', sql.Int, kategoria_id)
      .execute('DodajSlowko');

    res.json({ success: true });
  } catch (error) {
    console.error('Błąd dodawania słówka:', error);
    res.status(500).json({ success: false });
  }
});

//PUT - /api/slowka
app.put('/api/slowka', async (req, res) => {
  const { id, polski, hiszpanski, kategoria_id } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('nowyPolski', sql.NVarChar(255), polski)
      .input('nowyHiszpanski', sql.NVarChar(255), hiszpanski)
      .input('nowaKategoria', sql.Int, kategoria_id)
      .execute('EdytujSlowko');

    res.json({ success: true });
  } catch (error) {
    console.error('Błąd edycji słówka:', error);
    res.status(500).json({ success: false });
  }
});

//DELETE - /api/slowka
app.delete('/api/slowka/:polski/:kategoria_id', async (req, res) => {
  const polski = decodeURIComponent(req.params.polski);
  const kategoria_id = parseInt(req.params.kategoria_id, 10);

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('polski', sql.NVarChar(255), polski)
      .input('kategoria_id', sql.Int, kategoria_id)
      .execute('UsunSlowko');

    res.json({ success: true });
  } catch (error) {
    console.error('Błąd usuwania słówka:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`API działa na http://localhost:${port}`);
});
