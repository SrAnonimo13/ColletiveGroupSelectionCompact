import StudentModel from '../models/StudentModel.js'

export async function CreateStudent(name, class_id){
    const newStudent = await StudentModel.create({
        name,
        class: class_id
    });

    return await newStudent.save();
}

export async function GetStudentsFromClass(class_id) {
    const students = await StudentModel.find({ class: class_id });

    return students
}

export async function GetStudentsById(studentId) {
    try {
        return await StudentModel.findById(studentId);
    } catch {
        return null;
    }
}