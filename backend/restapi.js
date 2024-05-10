import express from "express";
import cors from "cors";
import { v4 } from "uuid";
import { DataAccessObject } from "./dao.js";

//-----------------------------
// Datenbank
//-----------------------------
const dao = new DataAccessObject();
dao.resetDB();

//-----------------------------
// Webserver
//-----------------------------
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

//-----------------------------
// Startseite
//-----------------------------
app.get('/', (request, response) => {
    const html = `
    <h1>Mein Webserver</h1>
    <p>Hallo Welt!</p>
    `;
    response.send(html);
});

//-----------------------------
// C R E A T E
//-----------------------------
app.post('/kontakte/', (request, response) => {
    // Kontaktdaten aus Body lesen
    const newKontakt = request.body;
    // Hier müsste eigentlich ein Validierung stattfinden
    // Prüfen, ob newKontakt richtiges Format hat

    // UUID hinzufügen
    newKontakt.id = v4();

    // Zur Datenbanktabelle hinzufügen
    dao.addKontakt(newKontakt);

    // Meldung an Client zurückschicken
    response.send(`Kontakt mit id ${newKontakt.id} erstellt.`);
});

//-----------------------------
// R E A D
//-----------------------------
// Alle Kontakte
app.get('/kontakte/', (request, response) => {
    const filter = request.query.filter;
    // 'all', 'after-2000'

    // gefilterte Tabelle von Datenbank holen
    const kontakte = dao.getAllKontakte(filter);

    // an REST-Client schicken
    response.send(kontakte);
});

// Kontakt mit id
app.get('/kontakte/:id', (request, response) => {
    // id aus URL lesen
    const id = request.params.id;

    // Kontakt mit id von Datenbank holen
    const kontakt = dao.getKontakt(id);

    if (kontakt) {
        // Kontakt mit entsprechender id gefunden
        response.send(kontakt);
    } else {
        // Keinen Kontakt mit entsprechender id gefunden
        response.status(404);
        response.send(`Es gibt leider keinen Kontakt mit der id ${id}.`);
    }
});

//-----------------------------
// U P D A T E 
//-----------------------------
app.put('/kontakte/:id', (request, response) => {
    // id aus URL lesen
    const id = request.params.id;

    // Kontaktdaten aus Body lesen
    const kontakt = request.body;

    // Hier müsste eigentlich ein Validierung stattfinden
    // Prüfen, ob newKontakt richtiges Format hat

    // Entscheidend ist die ID aus der URL,
    // nicht die ID im Body
    kontakt.id = id;

    // Kontakt updaten
    const anzahl = dao.updateKontakt(kontakt);

    // Überprüfen, ob Kontakt bearbeitet wurde
    if (anzahl > 0) {
        // Meldung an Client zurückschicken
        response.send(`Kontakt mit id ${id} wurde bearbeitet.`);
    } else {
        // Fehlermeldung schicken
        // Keinen Kontakt mit entsprechender id gefunden
        response.status(404);
        response.send(`Es gibt leider keinen Kontakt mit der id ${id}.`);
    }
});

//-----------------------------
// D E L E T E
//-----------------------------
app.delete('/kontakte/:id', (request, response) => {
    // id aus URL lesen
    const id = request.params.id;

    // Kontakt mit id zerstören, und vernichten
    const anzahl = dao.deleteKontakt(id);

    // Überprüfen, ob Kontakt gelöscht wurde
    if (anzahl > 0) {
        // Meldung an Client zurückschicken
        response.send(`Kontakt mit id ${id} gelöscht.`);
    } else {
        // Fehlermeldung schicken
        // Keinen Kontakt mit entsprechender id gefunden
        response.status(404);
        response.send(`Es gibt leider keinen Kontakt mit der id ${id}.`);
    }
});

//-----------------------------
// Server starten
//-----------------------------
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});