/* eslint-disable no-console */
import express from 'express'

const logger = (req: express.Request, res: express.Response, next: () => void): void => {
  const url = req.url
  console.log(`the url ${url} was visited`)
  next()
}

export default logger
