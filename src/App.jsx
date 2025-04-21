import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase/config";
import BucketListItem from "./components/BucketListItem";
import Analytics from "./components/Analytics";

const App = () => {
  const [bucketList, setBucketList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const q = query(collection(db, "bucketlist"), orderBy("created", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setBucketList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  const addItem = async () => {
    if (!newItem || !author) return;
    await addDoc(collection(db, "bucketlist"), {
      text: newItem,
      author,
      done: false,
      created: new Date()
    });
    
    setNewItem("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">🪣 Bucket List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="What do you want to do?"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </div>

      <Analytics data={bucketList} />

      {bucketList.map((item) => (
        <BucketListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default App;
