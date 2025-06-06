import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
type Env = {
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
};
const app = new Hono<Env>();
app.use('/*',cors())
app.route("/api/v1/user",userRouter);
app.route('/api/v1/blog',blogRouter)


export default app
