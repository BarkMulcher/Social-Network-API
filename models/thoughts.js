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
            reactionSchema
        ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => Date.now() + 7*24*60*60*1000,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// create virtual
thoughtSchema
    .virtual('reactionCount')
    // getter
    .get(function () {
        return this.reactions.length;
    });

// initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

