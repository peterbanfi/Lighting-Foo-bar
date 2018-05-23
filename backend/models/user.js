/**
 * @module usermodel
 */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * validator behúzása, telepítése
 */
const validator = require('validator');

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
  address: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  invoiceAddress: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  phone: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

/**
 * Beállítva az 5 elrontott próbálkozás után 3 percre kitiltás
 * @param usernameField - email címmel lehet belépni
 * @param passwordValidator - ellenőrzi, hogy a jelszónak min 8 karakternek kell lennie
 */
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  maxAttempts: 5,
  interval: 3000 * 60,
  hashField: 'password',
  passwordValidator: (password, cb) => {
    if (!validator.isLength(password, 8)) {
      return cb({
        code: 400,
        message: 'A megadott jelszónak legalább 8 karakter hosszúnak kell lennie.',
      });
    }
    return cb(null);
  },
});

module.exports = mongoose.model('User', userSchema);
