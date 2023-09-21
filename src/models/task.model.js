const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    title : { type: String, required : true },
    description : { type: String },
    assigned_users : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    task_completion : {
        target_completion : { type: String, default : undefined },
        actual_completion : { type: String, default : undefined }
    },
    root_cause : {
        type: String 
    },
    source_action: {
        type: String
    },
    status : {
        type: String,
        default: undefined
    },
    progress : {
        type: Number,
        default: 0,
    },
    created  : { 
        type: String,
        default : undefined
    },
    modified : { 
        type: String,
        default : undefined
    },
});

module.exports = model('Task', TaskSchema);