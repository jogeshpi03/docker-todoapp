const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const app = require('express')();
const moment = require('moment');

const FrontRouter = require('./routes/front');
app.locals.moment = moment;

app.set('view engine', 'ejs');
app.use(bodyParse.urlencoded({extended: false}));


const db = require('./config/keys').mongoProdURI;
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => {
    console.log(`Mongodb Connected`);
})
.catch((error) => {
    console.log(error);
});


app.use(FrontRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});