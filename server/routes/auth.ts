import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { GetToken, VerifyToken } from '../utility/password'

var router = express.Router()
const prisma = new PrismaClient()

router.post('/api/auth/register', async function (req, res, next) {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  const data = {
    createdAt: new Date(),
    updatedAt: new Date(),
    username: req.body.username,
    email: req.body.email,
    passwordHash: hash,
    lastOnline: new Date(),
  }

  const user = await prisma.user.create({
    data: data,
  })
  res.status(200).send({ message: 'respond register', user: user })
})

router.post('/api/auth/login', async function (req, res, next) {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = GetToken(user)

    res
      .status(200)
      .json({ message: 'Login successful', data: { token, ...user } })
  } catch (error) {
    console.error('Login error', error)
    res.status(500).json({ message: 'An error occurred while loggin in' })
  }
})

router.get('/api/auth/logout', function (req, res, next) {
  res.send('respond logout')
})

export default router
