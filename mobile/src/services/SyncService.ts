import { database } from '../db/database';
import NetInfo from "@react-native-community/netinfo";
import SyncQueue from '../models/SyncQueue';
import Patient from '../models/Patient';
import Family from '../models/Family';
import axios from 'axios';

const BACKEND_URL = 'http://10.0.2.2:8000';

export const processSyncQueue = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) return;

    const queueCollection = database.get<SyncQueue>('sync_queue');
    const pendingItems = await queueCollection.query().fetch();

    if (pendingItems.length === 0) return;

    try {
        const changes = pendingItems.map(item => ({
            table: item.tableName,
            id: item.recordId,
            op: item.operation,
            data: JSON.parse(item.payload)
        }));

        const response = await axios.post(`${BACKEND_URL}/sync/push`, { changes });

        if (response.data.status === 'success') {
            await database.write(async () => {
                for (const item of pendingItems) {
                    await item.destroyPermanently();
                }
            });
        }
    } catch (error) {
        console.error('Push failed:', error);
    }
};

export const pullRemoteChanges = async (villageId: string) => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) return;

    try {
        // Fetch last sync timestamp from local storage (simplified for now)
        const lastSync = "1970-01-01T00:00:00Z";

        const response = await axios.get(`${BACKEND_URL}/sync/pull`, {
            params: { last_pulled_at: lastSync, village_id: villageId }
        });

        if (response.data.status === 'success') {
            const { families, patients } = response.data.changes;

            await database.write(async () => {
                // Upsert logic for families
                const familyCollection = database.get<Family>('families');
                for (const familyData of families) {
                    // Logic to update or create local record
                    // ...
                }

                // Upsert logic for patients
                const patientCollection = database.get<Patient>('patients');
                for (const patientData of patients) {
                    // ...
                }
            });
        }
    } catch (error) {
        console.error('Pull failed:', error);
    }
};
