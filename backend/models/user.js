/**
 * @module usermodel
 */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * validator behúzása, telepítése
 */
const validator = require('validator');

/**
 * userSchema kibővítve a címmel, szállítási címmel
 * @param username - felhasználónév
 * @param email - email cím
 * @param rights - felhasználói jog: admin vagy user
 * @param address city - szállítási címhez tartozó város
 * @param address.address - szállítási címhez tartozó cím
 * @param address.address2 - szállítási címhez tartozó cím2
 * @param address.zip - szállítási cím irányítószám
 * @param invoice.city - számlázási cím város
 * @param invoice.address - számlázási címhez tartozó cím
 * @param invoice.address2 - számlázási címhez tartozó cím2
 * @param invoice.zip - számlázási cím irányítószám
 * @param phone - telefonszám
 */
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
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    address2: {
      type: String,
    },
    zip: {
      type: Number,
      required: false,
    },
  },
  invoice: {
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    address2: {
      type: String,
    },
    zip: {
      type: Number,
      required: false,
    },
  },
  phone: {
    type: Number,
    required: false,
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
