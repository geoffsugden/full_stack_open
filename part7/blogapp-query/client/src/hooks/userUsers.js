import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

export const useUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userService.getAll()
      return response
    },
  })

  return { users: result.data, isPending: result.isPending, isError: result.isError }
}

export default useUsers
