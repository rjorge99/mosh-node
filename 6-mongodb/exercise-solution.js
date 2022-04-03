const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses1() {
    const courses = await Course.find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        // .sort('name') //asc
        // .sort('-name') //desc
        .select({ name: 1, author: 1 });
    // .select('name author);
    console.log(courses);
}

async function getCourses2() {
    const courses = await Course
        // .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .find({ isPublished: true })
        .or([{ tags: 'backend' }, { tags: 'frontend' }])
        .sort({ price: -1 })
        // .sort('name') //asc
        // .sort('-name') //desc
        .select({ name: 1, author: 1, price: 1 });
    // .select('name author);
    console.log(courses);
}

async function getCourses2() {
    const courses = await Course
        // .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { title: /.*by.*/ }])
        .select('name author price');
    console.log(courses);
}

getCourses2();
