<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <!-- Logo -->
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <!-- END Logo -->

            <!-- Nav Items -->
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                >
                  {{ item.name }}
                </RouterLink>
              </div>
            </div>
            <!-- END Nav Items -->
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="user.imageUrl"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <router-link
                        :to="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                      >
                        {{ item.name }}
                      </router-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
              <!-- END Profile dropdown -->

              <button
                @click="handleSignOut"
                v-if="authStore.isAuthenticated"
                class="text-white text-xs pl-4"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <header class="bg-white shadow"></header>
    <main>
      <div class="mx-auto min-h-full">
        <!-- Your content -->
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'

import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()

const route = useRoute()

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  // { name: 'Calendar', href: '/calendars', current: false },
  { name: 'Appraisals', href: '/appraisals', current: false },
  // { name: 'Reports', href: '/reports', current: false },
  { name: 'Discuss', href: '/discuss', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign in', href: 'login' },
  { name: 'Register', href: 'register' },
]

function handleSignOut() {
  authStore.$reset()
}
</script>
