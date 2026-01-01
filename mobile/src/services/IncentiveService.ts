import { database } from '../db/database';
import ANCRecord from '../models/ANCRecord';
import VaccinationRecord from '../models/VaccinationRecord';

export const calculateProjectedIncentives = async () => {
    // Simple logic to project earnings
    // In a real app, this would be based on NHM guidelines

    const ancCount = await database.get<ANCRecord>('anc_records').query().fetchCount();
    const vaxCount = await database.get<VaccinationRecord>('vaccination_records').query().fetchCount();

    const rates = {
        ANC_REGISTRATION: 300,
        VACCINATION_VISIT: 100
    };

    return (ancCount * rates.ANC_REGISTRATION) + (vaxCount * rates.VACCINATION_VISIT);
};
