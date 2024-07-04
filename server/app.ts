import { createServer } from 'node:http'
import { dirname, join } from 'node:path'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'

// Routes
import authRouter from './routes/auth'
import appraisalRouter from './routes/appraisal'
import userRouter from './routes/user'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  /* options */
  connectionStateRecovery: {},
  cors: {
    origin: 'http://localhost:5173',
  },
})
const prisma = new PrismaClient()

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.use(bodyParser.json())

io.on('connection', async (socket) => {
  socket.on('chat message', async (msg, clientOffset, callback) => {
    try {
      // store the message in the database
      // console.log(msg, clientOffset)

      const createMessage = await prisma.message.create({
        data: {
          conversation: { connect: { id: parseInt(msg.message.roomId) } },
          sender: { connect: { id: parseInt(msg.senderId) } },
          content: msg.message.content,
          createdAt: msg.date,
          type: 'TEXT',
          attachments: {},
          usersTag: [],
          clientOffset: clientOffset,
        },
      })
      // console.log('createMessage', createMessage)
    } catch (e) {
      console.error(e)
      return
    }

    io.emit('chat message', msg)
    // acknowledge the event
    if (typeof callback === 'function') {
      callback()
    }
  })

  if (!socket.recovered) {
    // if the connection state recovery was not successful
    // try {
    //   await db.each(
    //     'SELECT id, content FROM messages WHERE id > ?',
    //     [socket.handshake.auth.serverOffset || 0],
    //     (_err, row) => {
    //       socket.emit('chat message', row.content, row.id)
    //     },
    //   )
    // } catch (e) {
    //   // something went wrong
    // }
  }
})

app.get('/messages', async (req, res) => {
  const senderId = 1
  const participants = await prisma.participant.findMany({
    where: { userId: senderId },
  })

  const conversationIds = participants.map((p) => p.conversationId)

  const messages = await prisma.message.findMany({
    where: {
      conversationId: {
        in: conversationIds,
      },
    },
    include: {
      sender: true,
    },
  })

  const data = {
    messages: messages.map(({ id, createdAt, sender, ...rest }) => {
      return {
        _id: id,
        username: sender.username,
        avatar: sender.profilePic,
        senderId: sender.id.toString(),
        timestamp: createdAt.toString().substring(16, 21),
        date: createdAt.toDateString(),
        ...rest,
      }
    }),
  }

  // console.log(data)
  res.send(data)
})

app.get('/rooms', async (req, res) => {
  const senderId = parseInt(req.query.id, 10)
  const conversationIds = await prisma.participant
    .findMany({
      where: { userId: senderId },
    })
    .then((participants) => {
      return participants.map((p) => p.conversationId)
    })

  const data = await prisma.participant.findMany({
    where: {
      conversationId: {
        in: conversationIds,
      },
    },
    include: {
      user: true,
      conversation: true,
    },
  })

  const groupedByConversationId = data.reduce((acc, item) => {
    if (!acc[item.conversationId]) {
      acc[item.conversationId] = {
        title: item.conversation.title,
        avatar: item.conversation.avatar,
        participants: [],
      }
    }
    acc[item.conversationId].participants.push(item)
    return acc
  }, {})

  const rooms = Object.entries(groupedByConversationId).map(
    ([conversationId, { title, avatar, participants }]) => ({
      roomId: conversationId,
      roomName: title,
      avatar: avatar,
      users: participants.map((participant) => ({
        _id: participant.userId.toString(),
        username: participant.user.username,
      })),
    }),
  )

  res.send(rooms)
})

app.use(authRouter)
app.use(appraisalRouter)
app.use(userRouter)

server.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
)
