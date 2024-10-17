import { useAuth } from "@clerk/clerk-expo";
import { db } from "../firebaseConfig"

import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    DocumentData
} from "firebase/firestore"
import { Alert } from "react-native";

export const createDocument = async <T extends DocumentData>(
    collectionName: string,
    data: T,
    userId: string | null | undefined // Passando o userId como argumento
  ): Promise<string | void> => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        ownerId: userId, // Usando o userId do argumento
      });
      console.log("Documento adicionado com ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar documento", error);
    }
  };

export const readDocuments = async (collectionName:string): Promise<DocumentData[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName))
        const documents: DocumentData [] = []
        querySnapshot.forEach((doc:any) => {
            documents.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return documents
    } catch (error) {
        console.error('Erro ao ler documentos:', error);
        return [];
    }
}

export const readDocument = async (collectionName: string, docId:string ) : Promise <DocumentData | undefined > => {
    try {
        const docRef = doc(db, collectionName, docId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists())  {
            return {
                id: docSnap.id,
                ...docSnap.data()
            }
        }else {
            console.log('Nenhum documento entrado!')
        }
    } catch (error) {
        console.error('Erro ao ler documento:', error);

    }
}

export const updateDocument = 
    async <T extends DocumentData> (
        collectionName:string, 
        docId:string, 
        updatedData:T,
        userId: string | null | undefined
    ): Promise <void> =>{

        try {
            const docRef = doc(db, collectionName, docId)
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
            console.log("Documento não encontrado!");
            return;
            }

            const docData = docSnap.data();

            // Verificando se o usuário é o dono do documento
            if (docData.ownerId !== userId) {
            console.log("Você não tem permissão para atualizar este documento!");
            Alert.alert("Error", "Você não tem permisão para editar esse produto")
            return;
            }

            // Atualizando o documento
            await updateDoc(docRef, updatedData);
            Alert.alert('Sucesso', 'Produto editado com sucesso!');
            console.log('Produto Editado com sucesso')
        } catch (error) {
            console.error('Error ao atualizar documento:', error)
        }

    }

export const deleteDocument = async (
    collectionName:string, 
    docId:string,
    userId: string | null | undefined
): Promise<void> => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
        console.log("Documento não encontrado!");
        return;
        }

        const docData = docSnap.data();

        // Verificando se o usuário é o dono do documento
        if (docData.ownerId !== userId) {
        console.log("Você não tem permissão para deletar este documento!");
        Alert.alert("Error", "Você não tem autorização pra deletar esse produto!")
        return;
        }

        // Deletando o documento
        await deleteDoc(docRef);
        console.log("Documento deletado com sucesso!");
        Alert.alert("Sucesso", "Produto deletado com Sucesso!")
    } catch (error) {
        console.log('Erro ao deletor documento:', error)
    }

}
