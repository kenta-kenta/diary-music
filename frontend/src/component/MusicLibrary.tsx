const MusicLibrary = () => {
    return (
        <div className="pt-16">
            <ul className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded space-y-4">
                <li className="flex items-center space-x-4">
                    <img src="" alt="楽曲1" className="w-16 h-16 object-cover rounded" />
                    <p className="text-lg font-medium">楽曲1</p>
                </li>
                <li className="flex items-center space-x-4">
                    <img src="" alt="楽曲2" className="w-16 h-16 object-cover rounded" />
                    <p className="text-lg font-medium">楽曲2</p>
                </li>
                <li className="flex items-center space-x-4">
                    <img src="" alt="楽曲3" className="w-16 h-16 object-cover rounded" />
                    <p className="text-lg font-medium">楽曲3</p>
                </li>
            </ul>
        </div>
    )
}

export default MusicLibrary