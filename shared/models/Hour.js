// shared/models/Hour.js
const modeler = require('./modeler')

const Hour = modeler.model({
  hour: { type: 'object', required: true, keys: {
    RowKey: { type: 'uuid', creator: 'uuid', required: true },
    PartitionKey: { type: 'string', modifier: 'sanitizeLiberally', required: true },
    sunday_open: { type: 'time' },
    sunday_close: { type: 'time', requiredIf: 'sunday_open' },
    monday_open: { type: 'time' },
    monday_close: { type: 'time', requiredIf: 'monday_open' },
    tuesday_open: { type: 'time' },
    tuesday_close: { type: 'time', requiredIf: 'tuesday_open' },
    wednesday_open: { type: 'time' },
    wednesday_close: { type: 'time', requiredIf: 'wednesday_open' },
    thursday_open: { type: 'time' },
    thursday_close: { type: 'time', requiredIf: 'thursday_open' },
    friday_open: { type: 'time' },
    friday_close: { type: 'time', requiredIf: 'friday_open' },
    saturday_open: { type: 'time' },
    saturday_close: { type: 'time', requiredIf: 'saturday_open' },
    uploaded: { type: 'number', creator: 'timestamp' },
    uploaded_by: { type: 'string', required: true },
    last_updated: { type: 'number', modifier: 'timestamp' },
    last_updated_by: { type: 'string', required: true },
  }},
  special: { type: 'array', required: true, values: { type: 'object', keys: {
    RowKey: { type: 'uuid', creator: 'uuid', required: true },
    PartitionKey: { type: 'string', modifier: 'sanitizeLiberally' },
    active_range_start: { type: 'number', required: true },
    active_range_end: { type: 'number', required: true },
    time_open: { type: 'time', required: true },
    time_close: { type: 'time', required: true },
    uploaded: { type: 'number', creator: 'timestamp' },
    uploaded_by: { type: 'string' },
    last_updated: { type: 'number', modifier: 'timestamp' },
    last_updated_by: { type: 'string' },
  }}}
})

module.exports = Hour
