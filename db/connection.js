const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://kailas:kailas123@cluster0.hu935.mongodb.net/my_locality", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });