const User = require('../models/user');
/**
 * @module User
 */
module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * összes regisztrált felhasználó listázása
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   */
  listAll: (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },

  /**
   * felhasználói jogosultság beállítása
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   */
  register: (req, res) => {
    User.register(new User({
      username: req.body.username,
      email: req.body.email,
      rights: req.body.rights,
    }), req.body.password)
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
  },
  /**
   * Egyszerű login
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba,
   * akkor a függvény visszaküldi az adott felhasználó megadott adatait.
   */
  login: (req, res) => res.json({
    login: true,
    user: req.user.rights,
  }),
  /**
   * És logout
   * @param {String} req - A kérés meghívja a logout(), beépített metódust.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a beállított adatokat.
   */
  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
  /**
   * felhasználó törlése
   * @param {String} req - A kérés a felhasználó azonosítóját állítja be.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a 200-as kódot.
   * */
  remove: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        return res.status(200).send(err);
      });
  },

  /**
   * Update felhasználó
   * @param {String} req - A kérés a felhasználó azonosítóját és fő aatait kéri.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a frissített adatokat.
   */
  update: (req, res) => {
    console.log(req.params);
    if (req.body.rights === true) {
      req.body.updatedAt = new Date().toLocaleDateString();
      User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) {
          res.send(err);
          console.log(err);
        }
        res.json(post);
      });
    }
  },

  /**
   * Egy bizonyos felhasználó keresése
   * @param {String} req - A kérés a felhasználó azonosítóját állítja be.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a 200-as kódot és a keresett felhasználót.
   */
  getOne: (req, res, next) => {
    User.findById(req.params.id)
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).end();
        }
        return res.status(200).json(userFound);
      })
      .catch(err => next(err));
  },
};