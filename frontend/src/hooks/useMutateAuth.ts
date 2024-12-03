import axios from "axios"
import { Credential } from "../types"
import { useNavigate } from "react-router-dom"
import useStore from "../store"
import { useError } from "./useError"
import { useMutation } from "@tanstack/react-query"

export const useMutateAuth = () => {
    const navigate = useNavigate()
    const resetEditedDiary = useStore((state) => state.resetEditedDiary)
    const { switchErrorHandling } = useError()
    const loginMutation = useMutation(
        async (user: Credential) =>
            await axios.post(`${import.meta.env.VITE_API_URL}/login`, user),
        {
            onSuccess: () => {
                navigate('/home')
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
    const registerMutation = useMutation(
        async (user: Credential) =>
            await axios.post(`${import.meta.env.VITE_API_URL}/signup`, user),
        {
            onError: (err: any) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err.response.data)
                }
            },
        }
        
    )
    const logoutMutation = useMutation(
        async () => await axios.post(`${import.meta.env.VITE_API_URL}/logout`),
        {
            onSuccess: () => {
                resetEditedDiary()
                navigate('/')
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
    return { loginMutation, registerMutation, logoutMutation }
}