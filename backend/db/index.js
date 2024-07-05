const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/Delta');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    friendRequest: {
        type: [String], 
        default: []    
    },
    playlist: {
        type: String,
        default:null
    },
    favSongs: {
        type: [String], 
        default: []    
    },
    
});
const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
       
    },
    songLink: {
        type: String,
        required: true,
        unique: true,
        
    }
    
});


const User= mongoose.model("User",userSchema);
const Song= mongoose.model("songs",songSchema);


module.exports={
    User,Song
}