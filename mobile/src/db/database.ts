import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'
import Patient from '../models/Patient'
import Visit from '../models/Visit'
import Family from '../models/Family'
import ANCRecord from '../models/ANCRecord'
import VaccinationRecord from '../models/VaccinationRecord'
import SyncQueue from '../models/SyncQueue'
import { getDatabaseEncryptionKey } from '../services/encryptionService'

let databaseInstance: Database;

export const initDatabase = async () => {
    const encryptionKey = await getDatabaseEncryptionKey();

    const adapter = new SQLiteAdapter({
        schema,
        jsi: true,
        dbName: 'asha_ehr_db',
        // encryptionKey, // SQLCipher key
        onSetUpError: error => {
            console.error('Database setup failed:', error)
        }
    })

    databaseInstance = new Database({
        adapter,
        modelClasses: [
            Patient,
            Visit,
            Family,
            ANCRecord,
            VaccinationRecord,
            SyncQueue,
        ],
    })

    return databaseInstance;
}

export const getDatabase = () => {
    if (!databaseInstance) {
        throw new Error("Database not initialized. Call initDatabase() first.");
    }
    return databaseInstance;
}

export { databaseInstance as database };
