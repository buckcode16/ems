import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'Alice',
      email: 'alice@example.com',
      passwordHash: 'hashedPasswordForAlice',
      profilePic: 'aliceProfilePicUrl',
      lastOnline: new Date(),
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
      passwordHash: 'hashedPasswordForBob',
      profilePic: 'bobProfilePicUrl',
      lastOnline: new Date(),
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
      passwordHash: 'hashedPasswordForcharlie',
      profilePic: 'charlieProfilePicUrl',
      lastOnline: new Date(),
    },
  })

  const conversation1 = await prisma.conversation.create({
    data: {
      title: 'Alice',
      createdAt: new Date(),
      isGroup: false,
      avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
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
