import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Diary } from '../types'
import { useError } from './useError'

export const useQueryDiaries = () => {
    const { switchErrorHandling } = useError()
    const getDiaries = async () => {
        const { data } = await axios.get<Diary[]>(
            `${import.meta.env.VITE_API_URL}/diaries`,
            { withCredentials: true }
        )
        return data
    }
    return useQuery<Diary[], Error>({
        queryKey: ['diaries'],
        queryFn: getDiaries,
        staleTime: Infinity,
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message)
            } else {
                switchErrorHandling(err.response.data)
            }
        },
    })
}