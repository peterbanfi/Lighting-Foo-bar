const Blogpost = require('../models/blogpost');
const UserController = require('../controller/user.controller');
const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
    list: (req, res) => {
        Blogpost.find({})
            .then(blogpost => res.json(blogpost))
            .catch(err => res.send(err));
    },

    find: (req, res) => {
        Blogpost.findById(req.params.id)
            .then(blogpost => res.json(blogpost))
            .catch(err => res.send(err));
    },

    create: (req, res) => {
        Blogpost.create(req.body)
            .then(blogpost => UserController.addPost(req.body.userid, blogpost._id))
            .then(blogpost => res.send(blogpost))
            .catch(err => res.send(err));
    },

    update: (req, res) => {
        Blogpost.findByIdAndUpdate(req.params.id, req.body)
            .then(blogpost => res.json(blogpost))
            .catch(err => res.send(err));
    },

    remove: (req, res) => {
        Blogpost.findByIdAndRemove(req.params.id)
            .then(blogpost => UserController.removePost(req.body.userid, blogpost._id))
            .then(blogpost => res.json(blogpost))
            .catch(err => res.send(err));
    },
};