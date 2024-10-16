require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")
const db_Connection = require("./database/db_connection.js")
const UserRouter = require("./routes/userRoute.js")
const aiRouter = require("./routes/aiRoute.js")

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/user",UserRouter)
app.use("/ai",aiRouter)






app.listen(process.env.PORT,()=>{
    console.log(`MAIN-SERVER IS RUNNING ON PORT : ${process.env.PORT}`);
})
