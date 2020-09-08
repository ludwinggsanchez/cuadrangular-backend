const mongoose = require('mongoose')

const uri = "mongodb+srv://cuadrangular-user:Q07QKEhuXZ1A51hI@cluster0.f0tun.mongodb.net/cuadrangular?retryWrites=true&w=majority";

const mongoseeOptions = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, mongoseeOptions)
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err))


module.exports = mongoose;