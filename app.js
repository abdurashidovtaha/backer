const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const ERR_NOT_FOUND = 'error.not_found';
const ERR_BAD_REQUEST = 'error.bad_request';
let nextPostId = 1;
let posts = [
    { id: nextPostId++, category: 'First Post', price: 500 },
    { id: nextPostId++, category: 'Second Post', price: 450 },
    { id: nextPostId++, category: 'Second Post', price: 450 },
    { id: nextPostId++, category: 'Second Post', price: 450 },
];

// const loading = document.createElement('img')

// REST API

server.get('/api/posts', (req, res) => {
    res.send(posts);
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const parseId = parseInt(id, 10);
    //res.send(post) =>id
    if (isNaN(parseId)) {
        res.statusCode = 400;
        res.send({ error: ERR_BAD_REQUEST });
        return;
    }
    const post = posts.find(o => o.id === parseId);
    res.statusCode = 200;
    res.send(post);
});

server.post('/api/posts', (req, res) => {
    const post = req.body;

    //if id = 0, -> add
    //id != 0, -> update
    try {
        if (post.id === 0) {
            post.id = nextPostId++;
            posts = [...posts, { ...post }];
            return;
        }
        posts = posts.map(o => {
            return o.id === post.id ? { ...o, ...post } : o;
        });
        res.statusCode = 200;
    } catch (e) {
        res.statusCode = 404;
    }

    res.send();
});

server.delete('/api/posts/:id', (req, res) => {
    try {
        const { id } = req.params;
        //delete object from arr
        const parseId = parseInt(id, 10);
        posts = posts.filter(o => o.id !== parseId);
        res.send(posts);
        res.statusCode = 200;
    } catch (e) {
        res.statusCode = 404;
    }

});



server.listen(9999);