const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {},
        createdAt: {},
        username: {},
        reactions: {}
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const reactionSchema = new Schema(
    {
        reactionId: {},
        reactionBody: {},
        username: {},
        createdAt: {}
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;