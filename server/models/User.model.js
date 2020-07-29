const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  phone: {
    type: Number
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Viajes'
  },
  booking: {
    type: [Schema.Types.ObjectId],
    ref: 'Reservas'
  },
  role: {
    type: String,
    default: 'cliente',
    enum: ['admin', 'cliente']
  }

}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;
