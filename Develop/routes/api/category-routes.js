const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product]
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Products
    include: [Product]
  })
  .then((category) => res.json(category))
  .catch((err) => res.status(400).json(err))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => res.status(200).json(newCategory))
  .catch((err) => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    id: req.body.id,
    name: req.body.name
  },
    {
      where: {
        id: req.params.id
      }
    })
    .then((updatedCategory) => res.status(200).json(updatedCategory))
    .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    id: req.body.id,
    name: req.body.name
  },
    {
      where: {
        id: req.params.id
      }
    })
    .then((deletedCategory) => res.status(200).json(deletedCategory))
    .catch((err) => res.status(400).json(err))
});

module.exports = router;
