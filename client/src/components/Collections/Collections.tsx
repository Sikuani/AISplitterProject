import axios from "axios";
import React from "react";
import { useState, useCallback, useEffect } from 'react';

function Collections() {
  const [collections, setCollections] = useState([]);

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
  }, [getCollection])

  return (
    <div>
      <h1>Collections</h1>
      <p>{JSON.stringify(collections)}</p>
    </div>
  );
}

export default Collections;
