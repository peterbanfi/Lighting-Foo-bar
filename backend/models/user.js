const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rights: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

/**
 * Beállítva az 5 elrontott próbálkozás után 3 percre kitiltás
 */
userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  interval: 3000 * 60,
  hashField: 'password',
});

module.exports = mongoose.model('User', userSchema);
