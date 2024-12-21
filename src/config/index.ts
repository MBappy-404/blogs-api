import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")})

export default{
    port: process.env.PORT,
    db_user: process.env.DB_USER,
    jwt_secret: process.env.JWT_ACCESS_SECRET,

}