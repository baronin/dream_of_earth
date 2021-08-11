import { DreamData } from "../../@types/dreamData";
import { categories } from "../mock/dream-categories";
import firebase from "./firebase";

export const create = async (dream: Omit<DreamData, "id">) => {
  await firebase.firestore().collection("dreams").doc().set(dream);
};

export const readDreams = async () => {
  try {
    const snapshot = await firebase.firestore().collection("dreams").get();
    // @ts-ignore TODO I don't have idea how it fix
    return snapshot.docs.map<DreamData>((doc) => {
      const data = doc.data();
      const categoriesDream = data.categories.map((id: string) => {
        const category = categories.find((item) => item.id === id);
        return category;
      });
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        country: data.country,
        acceptPrivacy: data.acceptPrivacy,
        videoDream: data.videoDream,
        textDream: data.textDream,
        categories: categoriesDream,
      };
    });
  } catch (error) {
    console.log("error", error.message);
    return error.message;
  }
};

export const deleteDream = async (id: string) => {
  await firebase.firestore().collection("dreams").doc(id).delete();
};

/* export const readDocumentCollection = async () => {
  const snapshot = await firebase.firestore().collection("dreams").get();
  return snapshot.docs.map((doc) => doc.id);
}; */
