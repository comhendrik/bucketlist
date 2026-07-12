import { Mood } from '../objects/Mood'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import {
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { JournalEntry } from '../objects/JournalEntry';

class JournalService {

    async createJournalEntry(text: string): Promise<JournalEntry> {
        const created = new Date()
        const docRef = await addDoc(collection(db, "journal"), {
            text: text,
            created: created
        });

        return {
            id: docRef.id,
            text,
            created,
        };
    }
}


export default new JournalService();