const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: STRING,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            math: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Invalid Email, try again"
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thoughts",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "users",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Get function to return the total "friendCount"
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// Generate the User model through userSchema
const User = model("User", userSchema);

module.exports = User