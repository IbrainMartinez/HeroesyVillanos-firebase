import firebase, { db } from '../firebaseConfig/firebase'
import { collection,getDocs,query,getDoc} from 'firebase/firestore'

export const getpersonas = async() => {
    const result = await getDocs(query(collection(db,"superheroes")))
    return result
}