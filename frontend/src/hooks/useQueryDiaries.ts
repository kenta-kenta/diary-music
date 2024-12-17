import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PaginatedResponse, User, DiaryDatesResponse } from '../types'
import { useError } from './useError'
import { format } from 'date-fns'

export const useQueryDiaries = (page: number = 1) => {
    const { switchErrorHandling } = useError()
    
    const getDiaries = async () => {
        const { data } = await axios.get<PaginatedResponse>(
            `${import.meta.env.VITE_API_URL}/diaries?page=${page}&page_size=10`,
            { withCredentials: true }
        )
        return data
    }
    
    return useQuery<PaginatedResponse, Error>({
        queryKey: ['diaries', page],
        queryFn: getDiaries,
        staleTime: 0,
        refetchOnMount: true,
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message)
            } else {
                switchErrorHandling(err.response.data)
            }
        },
    })
}

export const useQueryDiaryDates = (date: Date) => {
    const year = format(date, 'yyyy')
    const month = format(date, 'M')
  
    const answer = useQuery<DiaryDatesResponse>({
      queryKey: ['diaryDates', year, month],
      queryFn: async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/diaries/dates?year=${year}&month=${month}`,
          { withCredentials: true }
        )
        return data
      },
    })
    return answer
  }

export const useQueryUser = () => {
    return useQuery<User>({
      queryKey: ['user'],
      queryFn: async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          { withCredentials: true }
        )
        return data
      }
    })
  }