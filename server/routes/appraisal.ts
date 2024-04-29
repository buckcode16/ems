import express from 'express'
import { PrismaClient } from '@prisma/client'
import { GetToken, VerifyToken } from '../utility/password'

var router = express.Router()
const prisma = new PrismaClient()

router.get('/api/user/appraisal', async function (req, res, next) {
  const authHeader = req.headers['authorization']

  const payload = await VerifyToken(authHeader)

  const userId = payload.id

  const appraisals = await prisma.appraisal.findMany({
    where: {
      OR: [{ managerId: userId }, { employeeId: userId }],
    },
  })
  res.send(appraisals)
})

router.post('/api/user/appraisal', async function (req, res, next) {})

export default router
