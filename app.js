const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to MongoDB!'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/books', require('./controllers/bookController'));
app.get('/', (req, res) => res.status(200).json('Welcome to the Books API'));

app.get('*', (req, res) => res.status(404).json('Unknown GET endpoint'));
app.post('*', (req, res) => res.status(404).json('Unknown POST endpoint'));
app.put('*', (req, res) => res.status(404).json('Unknown PUT endpoint'));
app.delete('*', (req, res) => res.status(404).json('Unknown DELETE endpoint'));

app.listen(process.env.PORT, 
    () => console.log('Server is listening!'));