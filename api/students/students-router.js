const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const studentsModel = require('./students-model.js');
const authenticate = require('../auth/restricted-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.get('/', authenticate, (req, res) => {
    studentsModel.getStudents()
        .then(studentsModel => {
            res.json(studentsModel);
        })
        .catch(err => res.send(err));
});

server.post('/', authenticate, (req, res) => {
    const studentData = req.body;

    const parentId = req.body.parent_id
    console.log('parentid', req.body.parent_id)

    studentData.parent_id = parentId;
    studentsModel.postStudent(studentData)
        .then((studentsModel) => {
            res.status(200).json(studentsModel)
        }).catch((err) => {
            res.status(500).json({ message: 'Error adding student' })
        });
});


server.put('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    studentsModel.updateStudent(id, changes)
        .then((studentsModel) => {
            res.status(200).json({ message: `Student ${id} updated!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Updating Question' })
        });
});

server.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    studentsModel.removeStudent(id)
        .then(studentsModel => {
            res.status(204).json({ message: `Student ${id} Deleted!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Deleting Question' })
        });
});

module.exports = server;


