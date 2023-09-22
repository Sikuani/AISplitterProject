import axios from "axios";

type Item = {
  text: string;
  duration: number;
  offset: number;
}

export const createCollection = async (inputText: string) => {
  const collectionName = inputText.substring(0, 25);
  try {
    const response = await axios("/api/collection", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        name: collectionName,
      },
    });    
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
};

export const addTextToCollectionAPI = async (text: string | undefined, collectionID: string) => {
  try {
    const response = await axios(`/api/collection/${collectionID}/text`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        text,
      },
    });
    return response.data.text
  } catch (error) {
    console.error(error);
  }
}

export const renameCollection = async (collectionID: number, newName: string) => {
  try {
    const response = await axios(`/api/collection/${collectionID.toString()}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        name: newName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteCollection = async (collectionID: number) => { 
  try {
    await axios(`/api/collection/${collectionID.toString()}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export const viewCollection = async (collectionID: string) => { 
  try {
    const response = await axios(`/api/collection/${collectionID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const viewAllCollection = async () => { 
  try {
    const response = await axios(`/api/collection`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getTranscript = async (url: string) => {
  try {
    const response = await axios.get(`/api/youtube-transcript?url=${url}`);
    const { result } = response.data;
    const transcript: string[] = result.map((arrayText: Item) => {
      return arrayText.text;
    });

    const transcriptText = transcript.join(" ");
    return transcriptText;
  
  } catch (error) {
    console.log(error);
  }
}
