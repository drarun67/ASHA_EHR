import { Model } from '@nozbe/watermelondb'
import { field, date, text, readonly, relation } from '@nozbe/watermelondb/decorators'

export default class Visit extends Model {
    static table = 'visits'

    @field('patient_id') patientId!: string
    @text('visit_type') visitType!: string
    @date('visit_date') visitDate!: Date
    @text('clinical_data') clinicalData!: string
    @text('asha_id') ashaId!: string

    @relation('patients', 'patient_id') patient!: any
}
