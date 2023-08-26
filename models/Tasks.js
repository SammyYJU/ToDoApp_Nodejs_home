const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name must be input!"],
        trim: true,
        maxlength: [20,"Should be within 20 char!"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task",TaskSchema);
