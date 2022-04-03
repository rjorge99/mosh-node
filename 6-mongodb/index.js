const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublic: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'backend'],
        isPublic: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // Operadores de comparacion
    // eq (equal)
    // ne (not equal)
    // gt (grater than)
    // gte (grater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // Operadores de logico
    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        // .find({ author: 'Mosh' })
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        .find({ author: /.*Mosh.*/ }) // -> Uso de expresiones regulares (Ejemplo de contains)
        .skip((pageNumber - 1) * pageSize)
        // .or([{ author: 'Mosh' }, { isPublish: true }])
        // .and([{ author: 'Mosh' }, { isPublish: true }])
        .limit(pageSize)
        .sort({ name: 1 })
        // .select({ name: 1, tags: 1 });
        .count();
    console.log(courses);
}

// Query first approach
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    // console.log(course);
    // course.isPublish = true;
    // course.author = 'Other author';

    course.set({
        isPublic: true,
        author: 'Other author'
    });

    const result = await course.save();
    console.log(result);
}

// Approach: update first
// Update directly
// Optionally: get the updated document
async function updateCourseUpdateFirst(id) {
    //mongodb update operators
    // const result = await Course.updateOne(
    //     { _id: id },
    //     {
    //         $set: {
    //             author: 'Jorge',
    //             isPublic: false
    //         }
    //     }
    // );

    const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: {
                author: 'Jack ',
                isPublic: true
            }
        },
        { new: true } // regresa el nuevo elemento ya actualizado
    );

    console.log(course);
}

async function removeCourse(id) {
    // await Course.deleteOne({ _id: id });
    // await Course.deleteMany({ public: true });
    const course = await Course.findOneAndRemove(id);
    console.log(course);
}

removeCourse('6249ed20767b7d8964076487');
