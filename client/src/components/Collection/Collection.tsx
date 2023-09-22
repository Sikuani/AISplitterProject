import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { createChunk } from "../../utils";
import Instructions from "../Instructions/Instructions";
import Buttons from "../Buttons/Buttons";

type Collection = {
  createdAt: string;
  id: number;
  name: string;
  text: string;
  updatedAt: string;
  userId: string;
};

function Collection() {
  const { id } = useParams();

  const [collection, setCollection] = useState<Collection>();
  const [chunks, setChunks] = useState<string[]>([]);

  const getCollection = useCallback(async () => {
    try {
      const response = await axios.get(`/api/collection/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const collection = response.data;
      setCollection(collection);
      const chunks = createChunk(collection?.text);
      setChunks(chunks);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return (
    <div className="flex flex-col">
      <h1 className="m-6">Collection {id}</h1>
      <p className="m-6">{collection?.name}</p>
      <span className="m-auto mx-6">
        Character Count: {collection?.text.length}
      </span>

      <p className="border border-gray-300 rounded-lg p-2 overflow-hidden max-h-80 overflow-y-scroll w-[92%] m-auto">
        {collection?.text}
      </p>
      <Instructions chunks={chunks} />
      <div className="mb-10">
        <Buttons chunks={chunks} />
      </div>
    </div>
  );
}

export default Collection;
