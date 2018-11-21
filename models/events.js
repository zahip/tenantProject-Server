const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        event: {
            type: String
        },

        timestamps: {
            type: Date
        }
    }
)


const Events = mongoose.model('Events', eventSchema);
module.exports = Events;