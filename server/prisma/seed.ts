import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync('qwe123', salt)

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'Alice',
      email: 'alice@example.com',
      passwordHash: hash,
      profilePic:
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      lastOnline: new Date(),
      department: 'ADMINISTRATION',
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'Bob',
      email: 'bob@prisma.io',
      passwordHash: hash,
      profilePic:
        'https://plus.unsplash.com/premium_photo-1693146325929-ac24ca5ba503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
      lastOnline: new Date(),
      department: 'IT',
    },
  })

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@prisma.io' },
    update: {},
    create: {
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'Charlie',
      email: 'charlie@prisma.io',
      passwordHash: hash,
      profilePic:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      lastOnline: new Date(),
      department: 'IT',
    },
  })

  const conversation1 = await prisma.conversation.create({
    data: {
      title: 'Bob',
      createdAt: new Date(),
      isGroup: false,
      avatar: bob.profilePic,
      participants: {
        create: [
          { user: { connect: { id: alice.id } }, joinedAt: new Date() },
          { user: { connect: { id: bob.id } }, joinedAt: new Date() },
        ],
      },
      messages: {
        create: {
          sender: { connect: { id: alice.id } },
          content: 'Hello, Bob!',
          createdAt: new Date(),
          type: 'TEXT',
          attachments: {
            create: {
              extension: 'jpg',
              url: 'https://example.com/image.jpg',
              fileSize: 834846,
              fileType: 'image/jpeg',
            },
          },
          usersTag: [2],
          clientOffset: 'uniqueClientOffsetAliceMessage1',
        },
      },
    },
  })
  const conversation2 = await prisma.conversation.create({
    data: {
      title: 'Charlie',
      createdAt: new Date(),
      isGroup: false,
      avatar: charlie.profilePic,
      participants: {
        create: [
          { user: { connect: { id: alice.id } }, joinedAt: new Date() },
          { user: { connect: { id: charlie.id } }, joinedAt: new Date() },
        ],
      },
      messages: {
        create: {
          sender: { connect: { id: alice.id } },
          content: 'Hello, Charlie!',
          createdAt: new Date(),
          type: 'TEXT',
          attachments: {
            create: {
              extension: 'jpg',
              url: 'https://example.com/image.jpg',
              fileSize: 834846,
              fileType: 'image/jpeg',
            },
          },
          usersTag: [],
          clientOffset: 'uniqueClientOffsetAliceMessage2',
        },
      },
    },
  })

  const conversation3 = await prisma.conversation.create({
    data: {
      title: "ABC's Conversation",
      createdAt: new Date(),
      isGroup: true,
      participants: {
        create: [
          { user: { connect: { id: alice.id } }, joinedAt: new Date() },
          { user: { connect: { id: bob.id } }, joinedAt: new Date() },
          { user: { connect: { id: charlie.id } }, joinedAt: new Date() },
        ],
      },
      messages: {
        create: {
          sender: { connect: { id: alice.id } },
          content: 'Hello, all!',
          createdAt: new Date(),
          type: 'TEXT',
          attachments: {
            create: {
              extension: 'jpg',
              url: 'https://example.com/image.jpg',
              fileSize: 834846,
              fileType: 'image/jpeg',
            },
          },
          usersTag: [],
          clientOffset: 'uniqueClientOffsetAliceMessage3',
        },
      },
    },
  })

  const message1 = await prisma.message.create({
    data: {
      sender: { connect: { id: bob.id } },
      conversation: { connect: { id: 1 } },
      content: 'Ola, Alice!',
      createdAt: new Date(),
      type: 'TEXT',
      attachments: {},
      usersTag: [],
      clientOffset: 'uniqueClientOffsetBobMessage1',
    },
  })
  const message2 = await prisma.message.create({
    data: {
      sender: { connect: { id: bob.id } },
      conversation: { connect: { id: 3 } },
      content: 'Ola, all!',
      createdAt: new Date(),
      type: 'TEXT',
      attachments: {},
      usersTag: [],
      clientOffset: 'uniqueClientOffsetBobMessage2',
    },
  })

  const appraisal1 = await prisma.appraisal.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      employee: { connect: { id: bob.id } },
      manager: { connect: { id: alice.id } },
      appraisal_start: new Date(),
      appraisal_end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      emp_1: 'dummy text',
      emp_2: 'dummy text',
      emp_3: 'dummy text',
      emp_4: 'dummy text',
      emp_5: 'dummy text',
      emp_6: 'dummy text',
      emp_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      mgr_1: 'dummy text',
      mgr_2_stress: Math.floor(Math.random() * 5) + 1,
      mgr_2_time: Math.floor(Math.random() * 5) + 1,
      mgr_2_teamwork: Math.floor(Math.random() * 5) + 1,
      mgr_2_autonomy: Math.floor(Math.random() * 5) + 1,
      mgr_2_proactive: Math.floor(Math.random() * 5) + 1,
      mgr_3: 'dummy text',
      mgr_4: 'dummy text',
      mgr_5: 'dummy text',
      mgr_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
  })
  const appraisal2 = await prisma.appraisal.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      employee: { connect: { id: charlie.id } },
      manager: { connect: { id: alice.id } },
      appraisal_start: new Date(),
      appraisal_end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      emp_1: 'dummy text',
      emp_2: 'dummy text',
      emp_3: 'dummy text',
      emp_4: 'dummy text',
      emp_5: 'dummy text',
      emp_6: 'dummy text',
      emp_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      mgr_1: 'dummy text',
      mgr_2_stress: Math.floor(Math.random() * 5) + 1,
      mgr_2_time: Math.floor(Math.random() * 5) + 1,
      mgr_2_teamwork: Math.floor(Math.random() * 5) + 1,
      mgr_2_autonomy: Math.floor(Math.random() * 5) + 1,
      mgr_2_proactive: Math.floor(Math.random() * 5) + 1,
      mgr_3: 'dummy text',
      mgr_4: 'dummy text',
      mgr_5: 'dummy text',
      mgr_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
  })
  const appraisal3 = await prisma.appraisal.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      employee: { connect: { id: bob.id } },
      manager: { connect: { id: alice.id } },
      appraisal_start: new Date(),
      appraisal_end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      emp_1: 'dummy text',
      emp_2: 'dummy text',
      emp_3: 'dummy text',
      emp_4: 'dummy text',
      emp_5: 'dummy text',
      emp_6: 'dummy text',
      emp_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      mgr_1: 'dummy text',
      mgr_2_stress: Math.floor(Math.random() * 5) + 1,
      mgr_2_time: Math.floor(Math.random() * 5) + 1,
      mgr_2_teamwork: Math.floor(Math.random() * 5) + 1,
      mgr_2_autonomy: Math.floor(Math.random() * 5) + 1,
      mgr_2_proactive: Math.floor(Math.random() * 5) + 1,
      mgr_3: 'dummy text',
      mgr_4: 'dummy text',
      mgr_5: 'dummy text',
      mgr_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
  })

  console.log('Seed data created!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
