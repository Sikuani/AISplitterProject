import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { renameCollection, deleteCollection } from "../../utils/api";
import { useNavigate } from "react-router-dom";

type Collection = {
  createdAt: string;
  id: number;
  name: string;
  text: string;
  updatedAt: string;
  userId: string;
};

function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();

  const getCollection = useCallback(async () => {
    try {
      const response = await axios.get("/api/collection", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      const collection = response.data;
      setCollections(collection);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  const editCollection = async (collectionID: number) => {
    const newNameCollection = prompt("Input a new name for the collection");
    if (newNameCollection === null) {
      alert("You must input a new name for the collection");
      return;
    }
    await renameCollection(collectionID, newNameCollection);
    await getCollection();
  };

  const deleteCollectionID = async (collectionID: number) => {
    await deleteCollection(collectionID);
    await getCollection();
  };

  const navigateCollection = (collectionID: number) => {
    navigate(`/collection/${collectionID}`);
  };

  return (
    <div>
      <ul>
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="flex justify-center items-start gap-3 p-4 w-[92%] m-auto"
          >
            <button onClick={() => navigateCollection(collection.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </button>
            <li>{collection.name}</li>
            <button onClick={() => editCollection(collection.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            <button onClick={() => deleteCollectionID(collection.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Collections;
