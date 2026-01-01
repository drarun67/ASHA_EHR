import { Model } from '@nozbe/watermelondb'
import { field, date, text, readonly } from '@nozbe/watermelondb/decorators'

export default class ANCRecord extends Model {
    static table = 'anc_records'

    @field('patient_id') patientId!: string
    @date('lmp_date') lmpDate!: Date
    @date('edd_date') eddDate!: Date
    @field('parity') parity!: number
    @field('gravidity') gravidity!: number

    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date
}
