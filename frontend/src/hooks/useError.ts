import { useNavigate } from "react-router-dom"
import useStore from "../store"
import axios from "axios"
import { CsrfToken } from "../types"

export const useError = () => {
    const navigate = useNavigate()
    const resetEditedDiary = useStore((state) => state.resetEditedDiary)
    const getCsrfToken = async () => {
        const { data } = await axios.get<CsrfToken>(
            `${import.meta.env.VITE_API_URL}/csrf`
        )
        axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    const switchErrorHandling = (msg: string) => {
        switch (msg) {
            case 'invalid csrf token':
                getCsrfToken()
                alert('CSRF token is invalid, please try again.')
                break
            case 'invalid or expired jwt':
                alert('Invalid or expired JWT, please log in again.')
                resetEditedDiary()
                navigate('/')
                break
            case 'missing or malformed jwt':
                alert('Missing or malformed JWT, please log in again.')
                resetEditedDiary()
                navigate('/')
                break
            case 'duplicated key not allowed':
                alert('email already exist, please try again.')
                break
            case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
                alert('password is not correct')
                break
            case 'record not found':
                alert('email is not correct')
                break
            default:
                alert(msg)
        }
    }
    return { switchErrorHandling }
}