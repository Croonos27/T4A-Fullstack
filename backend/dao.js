import Database from "better-sqlite3";

export class DataAccessObject {
    constructor() {
        this.db = new Database('./dbs/kontakte.sqlite3');
        this.db.pragma('journal_mode = WAL');
    }

    resetDB() {
        // Tabelle löschen
        const sqlDropTable = `
        DROP TABLE IF EXISTS kontakte
        `;
        this.db.exec(sqlDropTable);

        // Tabelle erstellen
        const sqlCreateTable = `
        CREATE TABLE kontakte (
            'id' TEXT,
            'name'	TEXT,
            'birthday'	TEXT,
            'size' TEXT,
            'address' TEXT,
            'konto' TEXT,
            'animal' TEXT
        )
        `;
        this.db.exec(sqlCreateTable);

        // Beispieldatensätze erstellen
        const sqlInsert = `
        INSERT INTO kontakte
            (id, name, birthday, size, address, konto, animal)
        VALUES 
            ('aaa', 'Anna', '2003-12-24', 'XL', 'Alphastraße: 01', 'DE02100100100006820101', 'dog'),
            ('bbb', 'Berta', '2001-01-05', 'M', 'Betastreet: B', 'DE02700100800030876808', 'cat'),
            ('ccc', 'Carla', '1998-07-30', 'S', 'Gammastraße: 15', 'DE02200505501015871393', 'mouse')
        `;
        this.db.exec(sqlInsert);
    }

    //--------------------
    // CREATE
    //--------------------
    addKontakt(kontakt) {
        const sql = `
        INSERT INTO kontakte
            (id, name, birthday, size, address, konto, animal)
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
        `;
        const statement = this.db.prepare(sql);
        statement.run(kontakt.id, kontakt.name, kontakt.birthday, kontakt.size, kontakt.address, kontakt.konto, kontakt.animal);
    }

    //--------------------
    // READ
    //--------------------
    getAllKontakte(filter) {
        // filter: 'all', 'after-2000'
        let sql;
        switch (filter) {
            case 'after-2000':
                // nur nach 2000 geborene Kontakte
                sql = "SELECT * FROM kontakte WHERE birthday > '2000-01-01'";
                break;
            case 'size':
                //nach Größe sortieren
                sql = `SELECT * FROM kontakte
                ORDER BY CASE size
                    WHEN 'S' THEN 1
                    WHEN 'M' THEN 2
                    WHEN 'L' THEN 3
                    WHEN 'XL' THEN 4
                    ELSE 5
                END`;
                
                break;
            case 'dogowner':
                sql = `SELECT * FROM kontakte WHERE animal == 'dog'`
                break;
            default: // all
                // alle Kontakte
                sql = 'SELECT * FROM kontakte';
        }
        const statement = this.db.prepare(sql);
        const tabelle = statement.all();
        return tabelle;
    }

    getKontakt(id) {
        const sql = `
        SELECT * FROM kontakte
        WHERE id = ?
        `;
        const statement = this.db.prepare(sql);
        const kontakt = statement.get(id);
        return kontakt;
    }

    //--------------------
    // UPDATE
    //--------------------
    updateKontakt(kontakt) {
        const sql = `
        UPDATE kontakte
        SET
            name = ?,
            birthday = ?,
            size = ?,
            address = ?,
            konto = ?,
            animal = ?
        WHERE id = ?
        `;
        const statement = this.db.prepare(sql);
        const info = statement.run(kontakt.name, kontakt.birthday, kontakt.size, kontakt.address, kontakt.konto, kontakt.animal, kontakt.id);
        const anzahlDerAenderungen = info.changes;
        return anzahlDerAenderungen;
    }

    //--------------------
    // DELETE
    //--------------------
    deleteKontakt(id) {
        const sql = `
        DELETE FROM kontakte
        WHERE id = ?
        `;
        const statement = this.db.prepare(sql);
        const info = statement.run(id);
        const anzahlDerAenderungen = info.changes;
        return anzahlDerAenderungen;
    }
}