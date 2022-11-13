// schema for users:
const { Schema, Types, model } = require('mongoose');
const validator = require('validator');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('invalid email')
                }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);

userSchema
    .virtual('friendCount')
    // getter
    .get(function ()  {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;
