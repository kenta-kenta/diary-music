export const DiaryHint = () => {
  return (
    <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-orange-600 mb-4">
        書き方のヒント
      </h2>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center space-x-2">
          <span className="text-orange-500">1.</span>
          <p>実際にあったことを書いてみよう</p>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-orange-500">2.</span>
          <p>そのことから感じた気持ちを書いてみよう</p>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-orange-500">3.</span>
          <p>明日からどうしたいか書いてみよう</p>
        </li>
      </ul>
    </div>
  )
}
