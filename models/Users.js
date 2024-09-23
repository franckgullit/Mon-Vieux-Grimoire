const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return re.test(email.trim());
};

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, "L'adresse mail renseignée n'est pas valide"],
    },
    
    password: {type: String,required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);