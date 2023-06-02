import db from '../index.js';

const ClassSchema = new db.Schema({
    name: {
        required: true,
        type: String
    },
    students: [{
        type: db.Types.ObjectId,
        ref: 'Students'
    }]
});

export default db.model('Class', ClassSchema);