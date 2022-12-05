const mongoose = require('mongoose');
const Campground = require('../models/campground');

const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomm1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63526946e085e3da0576c6cc', //meu user ID
            location: `${cities[randomm1000].city}, ${cities[randomm1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, tenetur alias. Odio sit enim omnis reiciendis, possimus blanditiis ab. Veniam accusamus earum vero sed eos eveniet est, doloremque in fugiat.',
            price,
            geometry: {
                "type": "Point", 
                "coordinates": [
                    cities[randomm1000].longitude,
                    cities[randomm1000].latitude
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dudp6sgqg/image/upload/v1666711309/YelpCamp/fg2rkswthccxwp4zt6cp.jpg',
                    filename: 'YelpCamp/fg2rkswthccxwp4zt6cp',
                },
                {
                    url: 'https://res.cloudinary.com/dudp6sgqg/image/upload/v1666711310/YelpCamp/bnp1mz1ltznzap9wqp7d.jpg',
                    filename: 'YelpCamp/bnp1mz1ltznzap9wqp7d',
                },
                {
                    url: 'https://res.cloudinary.com/dudp6sgqg/image/upload/v1666711310/YelpCamp/f54nv3v0auher4grgvup.jpg',
                    filename: 'YelpCamp/f54nv3v0auher4grgvup',
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })