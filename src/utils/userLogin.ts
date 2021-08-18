import { computed, ref } from 'vue'
import { fetchMyUser } from './fetchMyUser'

export const loggedInUser = ref()
export const isLoggedIn = computed(() => loggedInUser.value !== undefined)

export async function login() {
  loggedInUser.value = await fetchMyUser()
}
