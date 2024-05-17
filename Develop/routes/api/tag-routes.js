const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
  .then((tags) => res.status(200).json(tags))
  .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [ 
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
  .then((tag) => res.json(tag))
  .catch((err) => res.status(400).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => res.status(200).json(newTag))
  .catch((err) => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      where: {
        id: req.params.id
      }
    })
    .then((updatedTag) => res.status(200).json(updatedTag))
    .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then((deletedTag) => res.status(200).json(deletedTag))
    .catch((err) => res.status(400).json(err))
});

module.exports = router;
