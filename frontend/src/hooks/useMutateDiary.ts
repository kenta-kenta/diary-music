import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useError } from './useError'
import  useStore  from '../store'
import { Diary } from '../types'
import axios from 'axios'


export const useMutateDiary = () => {
    const queryClient = useQueryClient()
    const { switchErrorHandling } = useError()
    const resetEditedDiary = useStore((state) => state.resetEditedDiary)

    const createDiaryMutation = useMutation(
        (diary: Omit<Diary, 'id' | 'created_at' | 'updated_at'>) =>
            axios.post<Diary>(`${import.meta.env.VITE_API_URL}/diaries`, diary),
            {
            onSuccess: (res) => {
                const previousDiaries = queryClient.getQueryData<Diary[]>(['diaries'])
                if (previousDiaries) {
                    queryClient.setQueryData<Diary[]>(['diaries'], [...previousDiaries, res.data])
                }
                resetEditedDiary()
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err.response.data)
                }
            },
        }
    )
    const updateDiaryMutation = useMutation(
        (diary: Omit<Diary, 'created_at' | 'updated_at'>) =>
            axios.put<Diary>(`${import.meta.env.VITE_API_URL}/diaries/${diary.id}`, {
                content: diary.content,
            }),
            {
            onSuccess: (res, variables) => {
                const previousDiaries = queryClient.getQueryData<Diary[]>(['diaries'])
                if (previousDiaries) {
                    queryClient.setQueryData<Diary[]>(
                        ['diaries'],
                        previousDiaries.map((diary) =>
                            diary.id === variables.id ? res.data : diary
                        )
                    )
                }
                resetEditedDiary()
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err.response.data)
                }
            },
            }
    )
    const deleteDiaryMutation = useMutation(
        (id: number) => axios.delete(`${import.meta.env.VITE_API_URL}/diaries/${id}`),
        {
            onSuccess: (_, variables) => {
                const previousDiaries = queryClient.getQueryData<Diary[]>(['diaries'])
                if (previousDiaries) {
                    queryClient.setQueryData<Diary[]>(
                        ['diaries'],
                        previousDiaries.filter((diary) => diary.id !== variables)
                    )
                }
                resetEditedDiary()
            },
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err.response.data)
                }
            },
        }
    )
    return { createDiaryMutation, updateDiaryMutation, deleteDiaryMutation }
}