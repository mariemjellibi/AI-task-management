/*
loginUser,registerUser,logoutUser
with protected routes:updateUserProfile,markNotificationsAsRead,getNotificationList,changeUserPassword
only for the admin:getTeamList activateUserProfile ,deleteUserProfile
*/
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import notification from "../models/Notification.js"
export const registerUser=async(req,res)=>{
    try{
        const {name,email,password,isAdmin,role,title}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
return res.status(400).json({
    status:false,
    message:"user already exists"
})        }
const user = await User.create({
    name,email,password,isAdmin,role,title
})
let token;
// la logique est de cree une token que pour les admins
if(user){
    isAdmin?token = generateToken(res,user._id):null;
    user.password=null;
    res.status(201).json("user's info",user);
}
else {
    return res
      .status(400)
      .json({ status: false, message: "Invalid user data" });
  }
console.log("token",token);
    }catch(error){
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
console.log("user",user);
        if (!user) {
            return res.status(400).json({ status: false, message: "User not found" });
        }

        const isPasswordCorrect = await user.matchPassword(password);
        console.log("isPasswordCorrect",isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(400).json({ status: false, message: "Incorrect password" });
        }

        // if (user.isActive === false) {
        //     return res.status(401).json({ 
        //         status: false, 
        //         message: "User account is not activated, contact the administrator." 
        //     });
        // }

       
       const token= generateToken(res, user._id);
        user.password = undefined;
console.log("token",token);
        return res.status(200).json({
            status: true,
            message: "Login successful",
            user,
            token
          
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

export const logoutUser=async(req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({status:true,message:"user logout successfully"})
    }catch(error){
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}
export const getTeamList=async(req,res)=>{
    try{
        const users= await User.find();
        console.log("team list : ",users);
     res.status(200).json(users);
    }catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
      }
}
export const getNotificationList= async(req,res)=>{
    try{
        const {userId}=req.user;
        const notifications = await Notification.find({
            team:userId,
            isRead:{$nin:[userId]},
        }).populate("task", "title");
        res.status(200).json(notifications);

    }catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
      }
}
/*
qu'est ce qu'un query en Express?
Un query est une partie de l'URL qui suit le symbole "?". Il est utilisé pour transmettre des informations supplémentaires à une requête HTTP. Par exemple, dans l'URL "https://www.example.com/search?q=javascript", le query est "q=javascript".
*/
export const markNotificationsAsRead = async(req,res)=>{
    try{
        const {userId}=req.user;
        const {isReadAll,id}=req.query; //the id mean the id of the notification
        if(isReadAll ==="all"){
            /*
            .insertMany(filtre,miseajpur,option)
             */
            await Notification.insertMany(
                {team:userId,isRead:{$nin:[userId]}},//this is the filter :on selectionne les  notification qui appartient a ce cet utilisateur (i know tema is an rayy but here we're using it as he contains only one ),de plus cet utilisateur ne doit
                //etre dans le tableau isRead $nin:not in 
               { $push:{isRead:userId}},//this is the update : on ajoute l'id de l'utilisateur dans le tableau isRead
                {new:true}
            )
        }else{
            //on va update only one notification and mark it as red
           await Notification.findOneAndUpdate({_id:id,isRead:{$nin:[userId]}},{ $push: { isRead: userId } },
            { new: true })

        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}