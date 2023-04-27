import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array
    },
    imageUrl: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    viewsCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
})


export default mongoose.model('Post', PostSchema)