const router = require('express').Router(),
    bookSchema = require('../models/bookSchema');

router.get('/seed', async (req, res) => {

    let seeded = false;
    await bookSchema.find({})
        .then(books => seeded = books?.length > 0)
        .catch(err => console.log(err));

    if (seeded) {
        res.status(500).json('Server is already seeded');
        return;
    }


    //? The below code catches an error in the console when seeding, but still works?
    bookSchema.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "W∀RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(() => res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(() => res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

router.get('/', (req, res) => {
    bookSchema.find({}, {title: 1, _id: 1})
        .then(foundBooks => res.status(200).json(foundBooks))
        .catch(err => res.status(404).json(err))
});

router.get('/:id', (req, res) => {
    bookSchema.findById(req.params.id, {__v: 0})
        .then(foundBook => res.status(200).json(foundBook))
        .catch(err => res.status(404).json(`Did not find index: ${req.params.id}`))
});

router.put('/:id', (req, res) => {
    bookSchema.findByIdAndUpdate(req.params.id, { '$set': { ...req.body } })
        .then(oldData => {
            //? Do we have to do another call here? Why can't the above 'then' give us the new data?
            bookSchema.findById(req.params.id)
                .then(newData => res.status(200).json(newData))
                .catch(err => res.status(400).json({'message': 'Error', 'error': err.message}))
        })
        .catch(err => res.status(400).json({'message': 'Update Failed', 'error': err.message}));
});

router.delete('/:id', (req, res) => {
    bookSchema.findByIdAndDelete(req.params.id)
        .then(deletedBook => res.status(200).json('Delete Complete'))
        .catch(err => res.status(400).json({'message': 'Delete Failed', 'error': err.message}));
});

router.post('/', (req, res) => {
    bookSchema.create(req.body)
        .then(newBook => res.status(200).json(newBook))
        .catch(err => res.status(400).json({'message': 'Create Failed', 'error': err.message}));
});

module.exports = router;