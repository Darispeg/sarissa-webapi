const { Schema, model } = require('mongoose');

const SolutionSchema = new Schema({
    title : { type: String, required : true },
    description : { type: String },
    trigger : { type : String }, 
    organizer : { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required : [true, "Organizer is required"] 
    },
    members : [
        {
            role : { type : String, required : true },
            member : { type: Schema.Types.ObjectId, ref: 'User' },
            validation : { type : String }
        }
    ],
    created : { 
        type: String,
        default : undefined
    },
    modified : { 
        type: String,
        default : undefined
    },
    corrective_actions : [
        {
            why : { type : String, required : true },
            evidence : { type : String, required : true },
            root_cause : { type : Schema.Types.Boolean },
            comment : { type : String },
            user_validation : [
                {
                    member : { type: Schema.Types.ObjectId, required : true },
                    validation : { type : Schema.Types.Boolean }
                }
            ],
        }
    ],
    status : { type: String },
});

module.exports = model('Solution', SolutionSchema);