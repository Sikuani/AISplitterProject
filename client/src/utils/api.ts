import axios from "axios";

//2. When the user submits the form, extract the text from the form and create a title for the text
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

export const addTextToCollectionAPI = async (text: string, collectionID: string) => {
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const renameCollection = async (collectionID: string, newName: string) => {
  try {
    const response = await axios(`/api/collection/${collectionID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: {
        name: newName,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export const deleteCollection = async (collectionID: string) => { 
  try {
    const response = await axios(`/api/collection/${collectionID}`, {
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
  } catch (error) {
    console.error(error);
  }
}