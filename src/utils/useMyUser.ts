import { useSWR } from '@attensi/swr'
import { nanoid } from 'nanoid'
import { fetchMyUser } from './fetchMyUser'

const key = nanoid() // Generate a unique key automatically

export function useMyUser() {
  const { data: user, error } = useSWR(key, fetchMyUser)
  return { user, error }
}
