const express = require('express')
const cors = require('cors')
const db = require("./models")
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoute')
const uploadRoutes = require('./routes/uploadRoutes')



const port = process.env.PORT || 5000;
const app = express()



app.use(express.json())
app.use(cors())
dotenv.config({path:'./config/config.env'})



///using routes


app.use('/api',userRoutes)
app.use('/api/uploads', uploadRoutes)

app.get ('/',(req,res) => {
    res.send("App is running")


})


db.sequelize.sync({alter:true}).then(() => {
    app.listen(port,() => {
        console.log(`Your app is running at http://localhost:${port}`);
        console.log('Your database Connected');
    })
}).catch((err) => {
    console.log(err)
})
