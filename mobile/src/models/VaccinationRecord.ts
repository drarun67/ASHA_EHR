import { Model } from '@nozbe/watermelondb'
import { field, date, text, readonly } from '@nozbe/watermelondb/decorators'

export default class VaccinationRecord extends Model {
    static table = 'vaccination_records'

    @field('patient_id') patientId!: string
    @text('vaccine_code') vaccineCode!: string
    @date('date_administered') dateAdministered!: Date
    @text('administered_by') administeredBy!: string

    @readonly @date('created_at') createdAt!: Date
}
