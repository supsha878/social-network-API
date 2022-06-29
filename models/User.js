const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {},
        email: {},
        thoughts: {},
        friends: {}
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;