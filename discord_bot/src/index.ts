import './bot/bot'
import express, { Request, Response } from 'express'

const { EXPRESS_PORT } = process.env

// Set up Express server
const app = express()

if (!EXPRESS_PORT) {
  console.error("Error: EXPRESS_PORT が設定されていません！")
  process.exit(1)
}

app.use('/', (req: Request, res: Response) => {
  res.sendStatus(200);
})
app.listen(EXPRESS_PORT, () => console.log(`Server started on port ${EXPRESS_PORT}!`));
