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

class MoodService {
    //   async getUsers(): Promise<Mood[]> {
    //     const response = await apiClient.get<User[]>("/users");
    //     return response.data;
    //   }

    //   async getUser(id: number): Promise<User> {
    //     const response = await apiClient.get<User>(`/users/${id}`);
    //     return response.data;
    //   }

    async createMood(level: number): Promise<Mood> {
        const created = new Date()
        const docRef = await addDoc(collection(db, "mood"), {
            level: level,
            created: created
        });

        return {
            id: docRef.id,
            level,
            created,
        };
    }

    async hasMoodForToday(): Promise<boolean> {
        const now = new Date();

        // Start of today
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        // Start of tomorrow
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);

        const q = query(
            collection(db, "mood"),
            where("created", ">=", startOfDay),
            where("created", "<", endOfDay)
        );

        const snapshot = await getDocs(q);

        return !snapshot.empty;
    }

    async getMonthlyHistoricalData(): Promise<Array<Mood>> {
        return []
    }

    

    //   async deleteUser(id: number): Promise<void> {
    //     await apiClient.delete(`/users/${id}`);
    //   }
}


export default new MoodService();