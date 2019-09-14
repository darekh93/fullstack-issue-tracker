const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: "Title is required"
    },
    description: {
        type: String,
        required: "Description is required"
    },
    status: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

var Issue = module.exports = mongoose.model("issue", issueSchema);
module.exports.get = function (callback, limit) {
    Issue.find(callback).limit(limit);
}