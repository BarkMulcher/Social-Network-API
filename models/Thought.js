
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


// reaction schema
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
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)


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
            type: Date,
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
            
        },
        username: {
            type: String,
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



// create virtual
thoughtSchema
    .virtual('reactionCount')
    // getter
    .get(function () {
        return this.reactions.length;
    });

// initialize thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

