import { useState, FormEvent } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { AuthForm } from '../component/auth/Auth'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({ email: email, password: pw })
    } else {
      await registerMutation
        .mutateAsync({ email: email, password: pw })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        )
    }
  }
  return (
    <div className="min-h-screen bg-orange-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm
        email={email}
        setEmail={setEmail}
        pw={pw}
        setPw={setPw}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={submitAuthHandler}
      />
    </div>
  )
}
