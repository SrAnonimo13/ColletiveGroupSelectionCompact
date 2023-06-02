import db from '../index.js';

const StudentSchema = new db.Schema({
    name: {
        required: true,
        type: String
    },
    afinities: {
        type: [{
            type: db.Types.ObjectId,
            ref: 'Students',
        }]
    },
    class: {
        type: db.Types.ObjectId,
        ref: 'Class'
    }
});

export default db.model('Students', StudentSchema);