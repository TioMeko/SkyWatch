const db = require('../config/connection');
const { User, Search } = require('../models');

const userData = require('./UserData.json');
const searchData = require('./searchData.json')

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await Search.deleteMany({});

    // bulk create each model
    const users = await User.insertMany(userData);
    const searches = await Search.insertMany(searchData);

    for (let search of searches) {
        // randomly add each dog to a user
        const randomUser = users[Math.floor(Math.random() * users.length)];
        randomUser.searches.push(search._id);
        await randomUser.save();
      }

    console.log('All data has been seeded!');
    process.exit(0);
})