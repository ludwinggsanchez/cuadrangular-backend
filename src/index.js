const express = require ('express');
const morgan = require ('morgan');
const path = require('path');
var cors = require('cors')

const app = express();

const { mongoose } = require ('./database');

// settings 
app.set('port', process.env.PORT || 3000)

//enable cors
app.use(cors())

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/team', require('./routes/team.routes'))
app.use('/fixture', require('./routes/fixture.routes'))

// statics files
app.use(express.static(path.join(__dirname, 'public')))

// starting server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
});