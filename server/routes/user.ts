import express from 'express'
import { PrismaClient } from '@prisma/client'

var router = express.Router()
const prisma = new PrismaClient()

router.get('/api/user', async function (req, res, next) {
  const users = await prisma.user.findMany()

  res.send(users)
})

export default router
