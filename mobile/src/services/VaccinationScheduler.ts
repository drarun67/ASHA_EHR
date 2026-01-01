import Patient from '../models/Patient';

export interface VaccinationDue {
    vaccineCode: string;
    dueDate: Date;
    milestone: string;
}

export const getImmunizationSchedule = (patient: Patient): VaccinationDue[] => {
    const schedule: VaccinationDue[] = [];
    const dob = new Date(patient.dob.split('-').reverse().join('-')); // Convert DD-MM-YYYY to Date

    // NIS Schedule
    const milestones = [
        { code: 'BCG', days: 0, label: 'At Birth' },
        { code: 'OPV-0', days: 0, label: 'At Birth' },
        { code: 'Hepatitis B-0', days: 0, label: 'At Birth' },
        { code: 'OPV-1', days: 42, label: '6 Weeks' },
        { code: 'Pentavalent-1', days: 42, label: '6 Weeks' },
        { code: 'IPV-1', days: 42, label: '6 Weeks' },
        { code: 'Rotavirus-1', days: 42, label: '6 Weeks' },
        // Expand as per NIS
    ];

    for (const m of milestones) {
        const due = new Date(dob);
        due.setDate(due.getDate() + m.days);
        schedule.push({
            vaccineCode: m.code,
            dueDate: due,
            milestone: m.label
        });
    }

    return schedule;
};
