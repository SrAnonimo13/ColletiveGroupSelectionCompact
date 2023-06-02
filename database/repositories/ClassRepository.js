import ClassModel from '../models/ClassModel.js';

import * as StudentRepository from './StudentRepository.js';

/**
 * @param {String} name 
 * @param {String[]} usersname
 */
export async function CreateClass(name, usersname) {
    const newClass = await ClassModel.create({ name, students: [] });

    const students = usersname.map(async name => {
        return await StudentRepository.CreateStudent(name, newClass.id);
    });

    newClass.students = await Promise.all(students);

    return await newClass.save();
}

export async function GetClassById(id) {
    const returnClass = await ClassModel.findById(id).populate('students').exec()

    return returnClass;
}