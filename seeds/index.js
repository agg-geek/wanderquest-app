const mongoose = require('mongoose');
const cities = require('./cities');
const { title, place, description } = require('./seedHelpers');
const Campground = require('../models/campground');
const dotenv = require('dotenv');

dotenv.config();

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

mongoose.set("strictQuery", true); // as per warning

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
	})
	.then(() => console.log("MongoDB connection successful"))
	.catch((err) => { console.error(err); });

let noOfCities = Math.min(cities.length, 500);
// console.log(numOfCities)

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < noOfCities; i++) {
        const randomCity = Math.floor(Math.random() * noOfCities);
        const price = Math.floor(Math.random() * 2500) + 5000;
        const camp = new Campground({
            author: '64d5077f00a29cae6ac473bb',
            location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
            title: `${sample(title)} ${sample(place)}`,
            description: `${sample(description)}`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(cities[randomCity].location.split(",")[1]),
                    parseFloat(cities[randomCity].location.split(",")[0])
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dyvulcqc2/image/upload/v1691685313/WanderQuest/camp1_zkpcxl.jpg',
                    filename: 'camp1_zkpcxl'
                },
                {
                    url: 'https://res.cloudinary.com/dyvulcqc2/image/upload/v1691685314/WanderQuest/camp2_p0brpc.jpg',
                    filename: 'camp2_p0brpc'
                },
                {
                    url: 'https://res.cloudinary.com/dyvulcqc2/image/upload/v1691685313/WanderQuest/camp3_bvodcw.jpg',
                    filename:  'camp3_bvodcw'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


// const cities = require('./cities');
// console.log(parseFloat(cities[0].location.split(",")[1]), parseFloat(cities[0].location.split(",")[0]));
// console.log(cities[0].location.split(",")[0]);
// console.log(typeof parseFloat(cities[0].location.split(",")[0]));
