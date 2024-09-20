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

export const createDocument = async <T extends DocumentData>(collectionName:string, data: T): Promise <string | void> => {

    try {
        const docRef = await addDoc(collection(db, collectionName), data)
        console.log('Documento adicionado com ID:', docRef.id)
        return docRef.id
    } catch (error) {
        console.error('Error ao adicionar documento', error)
    }
}

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
    async <T extends DocumentData> (collectionName:string, docId:string, updatedData:T): Promise <void> =>{

        try {
            const docRef = doc(db, collectionName, docId)
            await updateDoc(docRef, updatedData)
            console.log('Documento atualizado com sucesso!')
        } catch (error) {
            console.error('Error ao atualizar documento:', error)
        }

    }

export const deleteDocument = async (collectionName:string, docId:string): Promise<void> => {
    try {
        const docRef = doc(db, collectionName, docId)
        await deleteDoc(docRef)
        console.log('Documento deletado com sucesso!')
    } catch (error) {
        console.log('Erro ao deletor documento:', error)
    }

}
