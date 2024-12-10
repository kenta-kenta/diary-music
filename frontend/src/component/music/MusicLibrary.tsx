import React from "react";

interface MusicProps {
  id: number;
}

const Music: React.FC<MusicProps> = ({ id }) => {
  return (
    <div className="pt-16">
      <img
        src=""
        alt={`楽曲${id}`}
        className="w-16 h-16 object-cover rounded"
      />
      <p className="text-lg font-medium">楽曲{id}</p>
    </div>
  );
};

export default Music;
