const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  /**
   * One to Many kapcsolat
   * a blogposts tartalmazza a blogpost collection-ből azokat
   * az ObjectId-kat, amelyek az adott felhasználó blogbejegyzései
   */
  blogposts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blogpost',
  }],
}, {
  timestamps: true,
});

userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
});

module.exports = mongoose.model('User', userSchema);
