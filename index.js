var express        = require("express"),
app                = express(),
cors               = require("cors"),
bodyParser         = require("body-parser"),
mongoose           = require("mongoose"),
User               = require("./models/user");
var http = require('http');

var server = http.createServer(app) ;

mongoose.Promise = global.Promise;
var DBURL = "mongodb://localhost:27017/login-ashgen";
// const uri = "mongodb+srv://privyUser:uniquecafe@privycafesurvey-6qgxt.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://privyUser:DONwlczHZZixOKzI@privycafesurvey-shard-00-00-6qgxt.mongodb.net:27017,privycafesurvey-shard-00-01-6qgxt.mongodb.net:27017,privycafesurvey-shard-00-02-6qgxt.mongodb.net:27017/test?ssl=true&replicaSet=PrivyCafeSurvey-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var whitelist2 = [] ;
whitelist2 = ['http://127.0.0.1:2000']
var corsOptions = {
  credentials:true,                           //using credentials from frontend aftr authentication
  origin: function (origin, callback) {
     if (whitelist2.indexOf(origin) !== -1) {
        callback(null, true)
     } else {
        callback(new Error('Not allowed by CORS'))
     }
  }
}

app.use(cors(corsOptions)) ;

app.use(bodyParser.urlencoded({ limit: "50mb",extended: true }));
app.use(bodyParser.json({ limit: "50mb",extended: true }));

app.get("/",function(req,res){
  res.write("hi ! There")
})

app.post("/create-user",function(req,res){
  if(req.body.email){
    User.find({email:req.body.email},function(err,m){
      if(m.length == 0){
        if(req.body.email){
          var newuser = new User({email : req.body.email, gender:req.body.gender , dob:req.body.dob}) ;
        }else if(req.body.phone){
          var newuser = new User({phone : req.body.phone, gender:req.body.gender , dob:req.body.dob}) ;
        }
          newuser.save(function(err,record){
            if(err){
              console.log(err) ;
            }else{
              console.log(record)
              res.send(record._id)
            }
          })
      }else{
        res.send("failure-email") ;
      }
    })
  }else{
    User.find({phone:req.body.phone},function(err,m){
      if(m.length == 0){
        if(req.body.email){
          var newuser = new User({email : req.body.email, gender:req.body.gender , dob:req.body.dob}) ;
        }else if(req.body.phone){
          var newuser = new User({phone : req.body.phone, gender:req.body.gender , dob:req.body.dob}) ;
        }
          newuser.save(function(err,record){
            if(err){
              console.log(err) ;
            }else{
              console.log(record)
              res.send(record._id)
            }
          })
      }else{
        res.send("failure-phone") ;
      }
    })
  }
})

app.post("/basic-info",function(req,res){
  basicInfo = {
        NearestMetro : req.body.NearestMetro,
        Occupation:req.body.Occupation,
        Relationship: req.body.Relationship,
        AreaOfCafe : req.body.AreaOfCafe,
        Food : req.body.Food,
        CafeFood : req.body.CafeFood,
        Dessert:req.body.Dessert
  }
  User.findOneAndUpdate({_id:req.body.id},{$set:{basicInfo:basicInfo}},function(model,err){
          res.send("status")
    })
})
app.post("/past-experiences/:id",function(req,res){
    pastExperience = {
      ReasonsForCafe : req.body.ReasonsForCafe,
      AvgBill: req.body.AvgBill,
      AvgQuantity: req.body.AvgQuantity,
      LivelyYN: req.body.LivelyYN,
      NewCafe:req.body.NewCafe,
    }
    User.findOneAndUpdate({_id:req.params.id},{$set:{pastExperience:pastExperience}},function(model,err){
        res.send("status")
    })
})
app.post("/final-review/:id",function(req,res){
  finalReview = {
        LikeYN:req.body.LikeYN,
        Amenities:req.body.Amenities,
        FoodQuantity:req.body.FoodQuantity,
        FoodPrice:req.body.FoodPrice,
        PrivateSpace:req.body.PrivateSpace,
        PrivateSpacePrices:req.body.PrivateSpacePrices
  }  
  User.findOneAndUpdate({_id:req.params.id},{$set:{finalReview:finalReview}},function(model,err){
        res.send("status")
     })
})

server.listen(8080,function(){
  console.log("server running!!!!" + 3000);
});
