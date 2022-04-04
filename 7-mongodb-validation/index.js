const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile']

        //TODO: Using strings
        // lowercase: true,
        // uppercase: true,
        // trim: true
    },
    author: String,
    tags: {
        type: Array,
        //TODO: Custom validators
        // validate: {
        //     validator: function (v) {
        //         return v && v.length > 0;
        //     },
        //     message: 'A course should have at least one tag'
        // }
        //TODO: Custom validators with async, debe de regresar una promesa
        validate: {
            validator: async function (v) {
                return new Promise(function (resolve, reject) {
                    setTimeout(() => {
                        // Somo async work
                        resolve(v && v.length > 0);
                    }, 1000);
                });
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        required: function () {
            return this.isPublished;
        },

        //TODO: Getter y setters
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15
    });

    try {
        //TODO: Valida que tenga los campos requeridos
        // await course.validate();

        const result = await course.save();
        console.log(result);
    } catch (ex) {
        console.log(ex);
    }
}

createCourse();
