const express = require('express');
const app = express();
const http = require('http');
const products = require('./routers/products');
const {knex , knexSQLite} = require('./db/db.js');

// app.use(express.static(__dirname + 'public'));
app.use(express.json());
app.use("/public", express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use('/api', products)


const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

io.on("connection", (socket) => {
    knex
    .from("products")
    .select("*")
    .then((resp) => {
        socket.emit("products", resp)
        socket.on("dataProd", (x) => {
            const { title, price, thumbnail } = x;
            let objNew = {
                title: title,
                price: price,
                thumbnail: thumbnail,
                };
            knex("products")
                .insert(objNew)
                .then(() => {
                console.log("Registro ok!");
                knex
                    .from("products")
                    .select("*")
                    .then((resp) => {
                        io.sockets.emit('products', resp);
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    })
    .catch((err) => {
        console.log(err);
    });
knexSQLite
.from("message")
.select("*")
.then((resp) => {
    socket.emit("message", resp)
    socket.on("msn", (msnData) => {
        const { user, message } = msnData;
        let date = new Date();
        let times = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        let newMsn = {
            user: user,
            message: message,
            time: times
            };
            // console.log(newMsn);
        knexSQLite("message")
            .insert(newMsn)
            .then(() => {
                console.log("Registro ok!");
                knexSQLite
                .from("message")
                .select("*")
                .then((resp) => {
                    io.sockets.emit('message', resp);
                    // console.log(resp);
                })
                .catch((err) => {
                console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    })
})
.catch((err) => {
    console.log(err);
});
});

app.get("/", (req, res) => {
    knex
    .from("products")
    .select("*")
    .then((resp) => {
        res.render("index", { data: resp });
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/", (req, res) => {
    let objNew = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
    };
    knex("products")
        .insert(objNew)
        .then(() => {
        console.log("Registro ok!");
    })
    .catch((err) => {
        console.log(err);
    });
});



server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

