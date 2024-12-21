import express, { Request, Response } from 'express'
import { authRoutes } from './module/Auth/auth.route';
import { blogRoutes } from './module/Blog/blog.route';
import { AdminRoutes } from './module/Admin/admin.route';
import globalErrorHandler from './middleware/globalError';
 


 const app = express()

// middleware 
 app.use(express.json());


//  api routes 
app.use('/api/auth', authRoutes)
app.use('/api/blogs',blogRoutes )
app.use('/api/admin', AdminRoutes)

 app.get('/', (req:Request, res:Response) => {

    res.send("Blog is running")

 })

 app.use(globalErrorHandler);

 export default app