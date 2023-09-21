const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    ci: { type: String, require : true },
    name : { type: String, required : true },
    last_name : { type: String, required : true },
    email : {
        type: String,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phone : { type: String, required : true },
    birthday : { type: String },
    position : { type: String, required : true },
    password : { type: String, required : true },
    status : { type: String, required : true },
    role : { type: String, required : true },
    created : { 
        type: String,
        default : undefined
    },
    modified : { 
        type: String,
        default : undefined
    },
    icon: { type: String}
});

module.exports = model('User', UserSchema);