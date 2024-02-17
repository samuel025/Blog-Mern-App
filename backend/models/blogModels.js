const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'please add a text value'],
    },
    description : {
        type : String,
        required : true
    },
    image_url : {
        type : String,
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Blog', blogSchema)