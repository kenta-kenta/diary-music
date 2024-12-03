import React, { FormEvent, useState } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { ArrowPathIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'

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
        <CheckBadgeIcon className="w-10 inline-block text-blue-500" />
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
        <div>
          <button
            type="submit"
            disabled={!email || !pw}
            className="my-3 mx-1 px-3 py-1 bg-blue-600 text-white"
          >
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </div>
      </form>
      <ArrowPathIcon
        onClick={() => setIsLogin(!isLogin)}
        className="w-5 cursor-pointer text-blue-500"
      />
    </div>
  )
}
