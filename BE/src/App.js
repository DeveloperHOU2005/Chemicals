
import express from 'express'
import path from 'path';
import env from 'dotenv';
import cors from 'cors';


import config  from './config/Config.js';
import adminRouter from './routes/Admin/index.js'
import userRouter from './routes/User/index.js'
import { adminAther, userAther } from './middlewares/authMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js'
env.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

const port = process.env.PORT || 3000;


config(app);
app.use(express.json());
// 1. Cấu hình CORS chung (nếu bạn muốn áp dụng cho toàn bộ app)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174'
];
app.use(cors({
    origin: allowedOrigins,                 // frontend của bạn
    methods: ['GET','POST','PUT','PATCH','DELETE'],
  }));


app.use('/v1/admin/',adminAther, adminRouter)
app.use('/v1/',userAther, userRouter)
app.use('/api', uploadRoutes);


app.listen(port, ()=>{
    console.log(`Server run in http://localhost:${port}`)
})