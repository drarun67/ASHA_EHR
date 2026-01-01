import ANCRecord from '../models/ANCRecord';
import Patient from '../models/Patient';

export interface ClinicalAlert {
    type: 'high_risk' | 'warning' | 'info';
    message: string;
    code: string;
}

export const screenANCRecord = (anc: ANCRecord, patient: Patient): ClinicalAlert[] => {
    const alerts: ClinicalAlert[] = [];

    // Rule 01: High gravidity
    if (anc.gravidity >= 4) {
        alerts.push({
            type: 'high_risk',
            message: 'High Gravidity (4+ pregnancies) detected. Monitor closely.',
            code: 'HR_GRAV_4'
        });
    }

    // Rule 02: Adolescent pregnancy
    // Assuming patient.dob is 'DD-MM-YYYY'
    const birthYear = parseInt(patient.dob.split('-')[2]);
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear < 18) {
        alerts.push({
            type: 'high_risk',
            message: 'Adolescent pregnancy (under 18) detected.',
            code: 'HR_ADOLESCENT'
        });
    }

    // Rule 03: Late registration
    const lmp = new Date(anc.lmpDate);
    const now = new Date();
    const diffWeeks = Math.floor((now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24 * 7));
    if (diffWeeks > 12) {
        alerts.push({
            type: 'warning',
            message: 'Late ANC registration (> 12 weeks).',
            code: 'WARN_LATE_REG'
        });
    }

    return alerts;
};
