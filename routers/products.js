const express   = require('express');
const {knex , knexSQLite} = require('../db/db.js');

const {Router} = express;
const router    = Router();


router.get('/all', (req, res) => {
    knex
    .from('products')
    .select('*')
    .then((products) => {
        console.log(products);
        res.render('products', {data: products});
    })
    .catch((err) => {
        throw err;
    })
})


router.get('/prod/:id', (req, res) => {
    knex
        .from('products')
        .select('*')
        .where({id: req.params.id})
        .then((product) => {
            res.render('uploaded', {data: product});
            // res.send(product)
        })
        .catch((err) => {
            throw err
        })
})


router.post('/create', (req, res) => {
    let objNewProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        thumbnail: req.body.thumbnail
    };
    knex('products').insert(objNewProduct)
    .then(() => {
        console.log('Product created');
        res.send({message: 'Product created'});
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
})


router.put('/update/:id', (req, res) => {
    knex('products')
        .where({id: req.params.id})
        .update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail
        })
        .then(() => {
            console.log('Product updated');
            res.send({message: 'Product updated'});
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
})



router.delete('/delete/:id', (req, res) => {
    knex('products')
    .where({id: req.params.id})
    .del()
    .then(() => {
        console.log('Product deleted');
        res.send({message: 'Product deleted'});
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
})





module.exports = router