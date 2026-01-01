import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'patients',
      columns: [
        { name: 'full_name', type: 'string' },
        { name: 'abha_id', type: 'string', isIndexed: true },
        { name: 'mobile_no', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'dob', type: 'string' },
        { name: 'village_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'sync_status', type: 'string' }, // 'synced', 'pending', 'error'
      ]
    }),
    tableSchema({
      name: 'visits',
      columns: [
        { name: 'patient_id', type: 'string', isIndexed: true },
        { name: 'visit_type', type: 'string' }, // 'ANC', 'PNC', 'IMMUNIZATION'
        { name: 'visit_date', type: 'number' },
        { name: 'clinical_data', type: 'string' }, // JSON string of FHIR-like data
        { name: 'asha_id', type: 'string', isIndexed: true },
        { name: 'sync_status', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'sync_queue',
      columns: [
        { name: 'table_name', type: 'string' },
        { name: 'record_id', type: 'string' },
        { name: 'operation', type: 'string' }, // 'CREATE', 'UPDATE', 'DELETE'
        { name: 'payload', type: 'string' },
        { name: 'retry_count', type: 'number' },
        { name: 'created_at', type: 'number' },
      ]
    }),
  ]
})
