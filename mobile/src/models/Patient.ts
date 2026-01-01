import { Model } from '@nozbe/watermelondb'
import { field, date, text, readonly } from '@nozbe/watermelondb/decorators'

export default class Patient extends Model {
    static table = 'patients'

    @field('family_id') familyId!: string
    @text('full_name') fullName!: string
    @text('abha_id') abhaId!: string
    @text('mobile_no') mobileNo!: string
    @text('gender') gender!: string
    @text('dob') dob!: string
    @text('village_id') villageId!: string

    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date
}
