
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
}
)
const User=new mongoose.model('User',userSchema)


const subscribeSchema = new mongoose.Schema({
    email: String,
});

const Subscribe = new mongoose.model("Subscribe", subscribeSchema);

module.exports={User,Subscribe};



 