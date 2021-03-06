const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: { model: Product },
    })
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    })
    if (!oneTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(oneTag)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch (err) {
    res.status(400).json('Something went wrong', err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if (!updatedTag) {
      res.status(404).json('No Tag found with this id!');
      return;
    }
    res.status(200).json({ message: 'Tag has been updated' })
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({ 
      where: {
        id: req.params.id
      },
    })
    if (!deleted) {
      res.status(404).json({ message: 'No Tag found with this id!' })
      return;
    }
    res.status(200).json({ message: 'Tag has been deleted' })
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

module.exports = router;
