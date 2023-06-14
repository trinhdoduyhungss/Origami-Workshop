const models = require('../models');

module.exports = {
  get: {
    all: (req, res, next) => {
      const limit = +req.query.limit;
      if (limit) {
        models.Origami.find()
          .populate("author")
          .sort({ _id: -1 })
          .limit(limit)
          .then((origamies) => res.send(origamies))
          .catch(next);
        return;
      }
      models.Origami.find()
        .populate("author")
        .then((origamies) => res.send(origamies))
        .catch(next);
    },
	
    mine: (req, res, next) => {
      const limit = +req.query.limit;
      const { _id } = req.user;
      if (limit) {
        models.Origami.find({ author: _id })
          .populate("author")
          .sort({ _id: -1 })
          .limit(limit)
          .then((origamies) => res.send(origamies))
          .catch(next);
        return;
      }
      models.Origami.find({ author: _id })
        .populate("author")
        .then((origamies) => res.send(origamies))
        .catch(next);
    },
  },

  post: (req, res, next) => {
    const { description } = req.body;
    const { _id } = req.user;

    models.Origami.create({ description, author: _id })
      .then((createdOrigami) => {
        return Promise.all([
          models.User.updateOne({ _id }, { $push: { posts: createdOrigami } }),
          models.Origami.findOne({ _id: createdOrigami._id })
        ]);
      })
      .then(([modifiedObj, origamiObj]) => {
        res.send(origamiObj);
      })
      .catch(next);
  },

  put: (req, res, next) => {
    const id = req.params.id;
    const { description } = req.body;
    models.Origami.updateOne({ _id: id }, { description })
      .then((updatedOrigami) => res.send(updatedOrigami))
      .catch(next)
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.Origami.deleteOne({ _id: id })
      .then((removedOrigami) => res.send(removedOrigami))
      .catch(next)
  }
};