import Express from 'express'
import {router} from './router'

const app = Express()

app.use(Express.json())
app.use(router)

app.listen(3000, () => {
    console.log("server is running")
})