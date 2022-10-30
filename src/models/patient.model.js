import mongoose from 'mongoose'

const PATIENT_MISSED = -2
const PATIENT_RESCHEDULED = -1
const PATIENT_PENDING = 0
const PATIENT_PASSED = 1

const PatientSchema = new mongoose.Schema({
       code: {
              type: String,
              trim: true,

       },
       name: {
              type: String,
              trim: true,
              required: 'Name is required'

       },
       sex: {
              type: String,
              trim: true,
              required: 'sex is required'

       },
       phone: {
              type: String,
              trim: true,
              required: 'phone is required'

       },
       email: {
              type: String,
              trim: true,
              unique:[true ,'Email already exists'],
              match: [/.+\@.+\..+/, 'Please enter a valid email'],
              required: 'Email is required'

       },
       appointment_date: {
              type: Date,
              default: Date.now,


       },

       first_time: {
              type: Boolean,
              required: 'firstime is required. coise Yes or Not'

       },
       request_date: {
              type: Date,


       },

       appointment_status: {
              type: String,
              enum: ['missed', 'rescheduled','pending','passed'],
              required: 'status  is invalid'

       },

       appointment_time: {
              type: String,
              trim: true,
              required: 'appointment time is required'

       },
       address: {
              type: String,
              trim: true,
              required: 'addres is required'

       },
       city: {
              type: String,
              trim: true,
              required: 'city is required'

       },
       before_appointment: {
              type: String,
              trim: true,
              required: 'before apointment is required'

       },
       after_appointment: {
              type: String,
              trim: true,

       },
       created: {
              type: Date,
              default: Date.now,


       },
       updated: Date,



})
export default mongoose.model('Patient', PatientSchema);
