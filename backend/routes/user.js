const { Router }=require("express");
const {User,Song}=require('../db')
const router=Router();




router.get("/getUsers",async(req,res)=>{
const allUser = await User.find({});

res.send(allUser)

})

router.post("/signup",async (req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;

    try {
        const existingUser = await User.findOne({
            username: username
        });

        if (existingUser) {
            return res.status(411).json({
                message: "Username already taken/Incorrect inputs"
            });
        }

        const user = await User.create({
            username: username,
            password: password
        });

        res.status(200).json({
            msg: "User created successfully!!!",
            name: username,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

})
router.post("/signin",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
   
        let val=await User.findOne({
            username:username,
            password:password,
        })
        if(val){
           
            res.status(200).json({
                msg:"signed in sucessfully!!!",
                name:val.username,
                
            })
        }
        else{
            return res.status(403).json({
                msg: "Error while login",
              });
        }
     
   

})

router.post("/addSong",async (req,res)=>{
    
    const songName=req.body.songName;
    const songLink=req.body.songLink;

    try {
        const existingUser = await Song.findOne({
            songName: songName
        });

        if (existingUser) {
            return res.status(411).json({
                message: "song already taken/Incorrect inputs",
                type:existingUser,
            });
        }

        const user = await Song.create({
            songName: songName,
            songLink: songLink
        });

        res.status(200).json({
            msg: "song added successfully!!!",
           songName:songName
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

})

router.get("/getSongs",async(req,res) => {
    const allSong = await Song.find({});
    res.send(allSong);
})

//geting a user

router.post("/oneUser",async (req,res) => {

const username = req.body.username;

;

try {
    const user = await User.findOne({username:username});


    if (user) {
        return res.status(200).send(user);
    }
     else{
        return res.status(411).send("user not exist")
     }

} catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
        message: "Internal server error"
    });
}


})


//adding playlist songs
router.put("/playlist",async (req,res) => {

const song =req.body.playlist;
const username = req.body.username;

try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $push: { favSongs: song } }, 
      { new: true } // Options: return the updated document
    );

    if (updatedUser) {
      res.status(200).send('Song added to favorite songs');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});
router.put("/playlistName",async (req,res) => {

const playlistName =req.body.title;
const username = req.body.username;

try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { playlist: playlistName } }, 
      { new: true } // Options: return the updated document
    );

    if (updatedUser) {
      res.status(200).send(playlistName);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});









module.exports=router