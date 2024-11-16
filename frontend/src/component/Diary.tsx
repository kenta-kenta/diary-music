const DiaryForm = () => {
  return (
    <>
      <div className="pt-16">
        <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded">
          <textarea
            name="diary"
            id="diary"
            className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="ここに日記を書いてください..."
          ></textarea>
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
            送信する
          </button>
        </div>
      </div>
    </>
  );
};

export default DiaryForm;
