require('../models/db');
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');


// REGISTER USER
exports.registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        profilePic: req.body.profilePic
    });
    try {
       await newUser.save();
       res.json(newUser)
    } catch (err) {
       res.status(500).json(err) 
    }
}

// LOGIN USER
exports.loginUser = async (req, res) => {

    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json('Wrong Credentials');
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json('Wrong Credentials');
        const { password, ...others } = user._doc;
        res.status(200).json(others)

    } catch (err) {
        res.status(400).json(err)
    }
}


// UPDATE USER
exports.updateUser = async (req, res) => {
   
  if(req.body.userID === req.params.id) { 
      if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt); 
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedUser)
    } 
    catch (err) {
        res.status(400).json(err)
    }
} else {
    res.status(401).json('You can only update your account')
}
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    if (req.body.userID = req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
               if(Post)  await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('This User has been deleted');
                console.log(req.params.id)
            } catch (err) {
                res.status(401).json(err)
            }
        } catch (err) {
            res.status(400).json(err)
        }
       
    } else {
        res.status(404).json('You can only delete your account')
    }
}

// GET USER
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(404).json(err)
    }
}