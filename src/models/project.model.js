const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    title : { type: String, required : true },
    short_title : { type: String },
    description : { type: String },
    organizer : { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required : [true, "Organizer is required"] 
    },
    members : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    tasks : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task' 
    }],
    project_completion : {
        target_completion : { type: String, default : undefined },
        actual_completion : { type: String, default : undefined }
    },
    created : { 
        type: String,
        default : undefined
    },
    modified : { 
        type: String,
        default : undefined
    },
    icon : { type: String },
    status : { type: String }
});

module.exports = model('Project', ProjectSchema);