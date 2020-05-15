var mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var UserSchema = new mongoose.Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    auto: true,
  },
    phone: {type:String,auto:false},
    email: {
        type: String,
        auto:false,
    },
    gender: {type:String, auto:false},
    dob: {type:String, auto:false},

    basicInfo : 
      {
        NearestMetro : {type:String},
        Occupation:{type:String},
        Relationship: {type:String},
        AreaOfCafe : {type:String},
        Food : {type:String},
        CafeFood : {type:String},
        Dessert:{type:String},
      },
    pastExperience : {
        ReasonsForCafe : [
          {
            type:String
          }
        ],
        AvgBill: [
          {
            Persons:{type:String},
            Bill:{type:String}
          }
        ],
        AvgQuantity: [
          {
            Persons:{type:String},
            Drinks:{type:String},
            Dishesh:{type:String},
            Desserts:{type:String},
          }
        ],
        LivelyYN: {type:String},
        NewCafe:{type:String},
      },
    finalReview:{
        LikeYN:{type:String},
        Amenities:{type:String},
        FoodQuantity:{
          Amount:{type:String},
          Suggestion:{type:String,default:"none"},
        },
        FoodPrice:{
          Amount:{type:String},
          Suggestion:{type:String,default:"none"},
        },
        PrivateSpace:{type:String},
        PrivateSpacePrices:{
          Verdict:{type:String},
          Suggestion:{type:String,default:"none"},
        }
      }
});

// UserSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email"]})

module.exports = mongoose.model("User", UserSchema) ;

