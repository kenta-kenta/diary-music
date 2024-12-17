import { FC, FormEvent } from 'react'

type AuthFormProps = {
  email: string
  setEmail: (email: string) => void
  pw: string
  setPw: (pw: string) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const AuthForm: FC<AuthFormProps> = ({
  email,
  setEmail,
  pw,
  setPw,
  isLogin,
  setIsLogin,
  onSubmit: submitAuthHandler,
}) => {
  return (
    <div className="min-h-screen bg-orange-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-orange-600">
            {isLogin ? 'ログイン' : '新規登録'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitAuthHandler}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="パスワード"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={!email || !pw}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLogin ? 'ログイン' : '新規登録'}
            </button>
            <div className="text-sm text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
