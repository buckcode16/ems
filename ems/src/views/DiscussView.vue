<template>
  <vue-advanced-chat
    v-if="authStore.isAuthenticated"
    :current-user-id="currentUserId"
    :rooms="rooms"
    :messages="messages"
    :messages-loaded="messagesLoaded"
    :room-actions="JSON.stringify(roomActions)"
    :rooms-loaded="true"
    @send-message="sendMessage($event.detail[0])"
    @fetch-messages="fetchMessages($event.detail)"
    :height="chatHeight + 'px'"
  />
  <div class="flex justify-center items-center p-4" v-else>
    <p class="text-xl p-4 border rounded-md shadow border-gray">
      Please log in
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import axios from 'axios'

import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
  auth: {
    serverOffset: 0,
  },
  ackTimeout: 10000, // 10s
  retries: 3,
})

import { register } from 'vue-advanced-chat'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()
const currentUserId = computed(() => authStore.user.id)
const rooms = ref(null)
const allMessages = ref(null)
const messages = ref([])
const messagesLoaded = ref(true)
const roomActions = ref([
  { name: 'inviteUser', title: 'Invite User' },
  { name: 'removeUser', title: 'Remove User' },
  { name: 'deleteRoom', title: 'Delete Room' },
])

const counter = ref(0)

const sendMessage = (message) => {
  const timestamp = new Date()
  const date = new Date()
  messages.value = [
    ...messages.value,
    {
      _id: messages.value.length,
      content: message.content,
      senderId: currentUserId.value.toString(),
      timestamp: timestamp.toString().substring(16, 21),
      date: date.toDateString(),
    },
  ]

  const data = {
    message,
    senderId: currentUserId.value,
    date: date,
  }
  const clientOffset = `${socket.id}-${counter.value++}`
  socket.emit('chat message', data, clientOffset, () => {
    console.log('Message delivered.')
  })
}

const fetchMessages = (event) => {
  messagesLoaded.value = false
  messages.value = []
  setTimeout(() => {
    messages.value = allMessages.value.filter((m) => {
      return event[0].room.roomId == m.conversationId
    })
    messagesLoaded.value = true
  })
}

const initVueChat = () => {
  if (authStore.isAuthenticated) {
    // fetch messages
    axios
      .get('http://localhost:3000/messages')
      .then(function (response) {
        // handle success
        console.log('from Init messages', response.data.messages)
        const toString = response.data.messages.map(
          ({ senderId, ...rest }) => ({
            senderId: senderId.toString(),
            ...rest,
          }),
        )
        allMessages.value = toString
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
      })

    // fetch rooms
    axios
      .get('http://localhost:3000/rooms', {
        params: {
          id: authStore.user.id,
        },
      })
      .then(function (response) {
        // handle success
        console.log('from Init rooms', response)
        rooms.value = response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
      })

    register()
  }
}

const chatHeight = ref(window.innerHeight * 0.85)

const updateHeight = () => {
  chatHeight.value = window.innerHeight * 0.85
}

onMounted(() => {
  window.addEventListener('resize', updateHeight)
  // socket.on('chat message', (msg, serverOffset) => {
  //   messages.value = [
  //   ...messages.value,
  //   {
  //     _id: messages.value.length,
  //     content: message.content,
  //     senderId: currentUserId.value,
  //     timestamp: timestamp,
  //     date: date,
  //   },
  // ]
  //   socket.auth.serverOffset = serverOffset
  // })
  initVueChat()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})
</script>
<style scoped></style>
