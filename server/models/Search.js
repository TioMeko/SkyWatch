const { Schema, model } = require("mongoose");

const searchSchema = new Schema ({
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const Search = model("Search", searchSchema);

module.exports = Search;