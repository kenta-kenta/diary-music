import React, { FormEvent, useState } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { Sync, VerifiedUser } from '@mui/icons-material'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [username, setUsername] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({ email: email, user_name: username, password: pw })
    } else {
      await registerMutation
        .mutateAsync({ email: email, user_name: username, password: pw })
        .then(() =>
          loginMutation.mutate({
            email: email,
            user_name: username,
            password: pw,
          })
        )
    }
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div>
        <VerifiedUser className="w-10 inline-block text-orange-600" />
        <span className="text-gray-700 text-3xl">
          Todo app by React/Go(echo)
        </span>
      </div>
      <h2 className="my-6">{isLogin ? 'Login' : 'Create a new account'}</h2>
      <form onSubmit={submitAuthHandler}>
        <div>
          <input
            className="mb-3"
            name="email"
            type="email"
            autoFocus
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className="mb-3"
            name="user_name"
            type="text"
            placeholder="User name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <input
            className="mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!email || !pw}
            className="my-3 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </div>
      </form>
      <Sync
        onClick={() => setIsLogin(!isLogin)}
        className="w-5 cursor-pointer text-orange-600"
      />
    </div>
  )
}
