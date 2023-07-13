const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'participant'],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
