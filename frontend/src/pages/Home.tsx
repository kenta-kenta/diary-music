import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="text-4xl font-bold mb-4">ホームページ</h1>
      <p className="text-lg mb-6">こちらはホームページです。</p>
      <ul className="space-y-4">
        <li>
          <Link to="/diary" className="text-blue-500 hover:underline">
            日記を書くページへ
          </Link>
        </li>
        <li>
          <Link to="/music" className="text-blue-500 hover:underline">
            音楽を見るページへ
          </Link>
        </li>
        <li>
          <Link to="/mypage" className="text-blue-500 hover:underline">
            マイページへ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
