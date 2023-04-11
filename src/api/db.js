const mongoose = require("mongoose")
console.log("imdb")
mongoose.connect("mongodb+srv://FOSystem:FOSystem2023@cluster1.iu7f3bf.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true ,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection To Database is Successfull")
}).catch((error)=>{
    console.log("Something is Wrong ")
    console.log("Following is Error : ")
    console.log(error)
})




