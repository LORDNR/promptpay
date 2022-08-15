import Express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { routes } from './routes/promptpay.route'

const app: Application = Express()

app.use(cors());
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: "success"
    })
})

app.use('/', routes)

app.listen(process.env.PORT || 3006, () => {
    console.log("Welcome to server");
});