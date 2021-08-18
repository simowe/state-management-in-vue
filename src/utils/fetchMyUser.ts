import { delay } from './delay'

export async function fetchMyUser() {
  console.log('fetchMyUser')
  await delay(1000)

  return {
    username: 'Super USER!'
  }
}
