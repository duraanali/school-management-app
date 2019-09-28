const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const parentsModel = require('./parents-model.js');
const authenticate = require('../auth/restricted-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.get('/', authenticate, (req, res) => {
    parentsModel.getParents()
        .then(parentsModel => {
            res.json(parentsModel);
        })
        .catch(err => res.send(err));
});

server.post('/', authenticate, (req, res) => {
    const parentData = req.body;
    parentsModel.postParent(parentData)
        .then((parentsModel) => {
            res.status(200).json(parentsModel)
        }).catch((err) => {
            res.status(500).json({ message: 'Error adding Parent' })
        });
});


server.put('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    parentsModel.updateParent(id, changes)
        .then((parentsModel) => {
            res.status(200).json({ message: `Parent ${id} updated!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Updating Parent' })
        });
});

server.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    parentsModel.removeParent(id)
        .then(parentsModel => {
            res.status(204).json({ message: `Parent ${id} Deleted!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Deleting Parent' })
        });
});

module.exports = server;


