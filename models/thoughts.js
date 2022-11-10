const { Schema, model } = require('mongoose');

// schema for what makes up a thought
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            Type: Date,
            default: () => Date.now() + 7*24*60*60*1000,
        },
        username: {
            Type: String,
            required: true,
        },
        reactions: [
            
        ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);

// initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;


// text: String,
// username: String,
// reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],