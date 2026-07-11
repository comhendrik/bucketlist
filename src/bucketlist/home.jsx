import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import BucketListItem from "./BucketListItem";
import Analytics from "./Analytics";

const BucketList = ({ data }) => {

  const [bucketList, setBucketList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "bucketlist"), orderBy("created", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        setBucketList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsub();
  }, []);

  const addItem = async () => {
    if (!newItem) return;
    await addDoc(collection(db, "bucketlist"), {
      text: newItem,
      done: false,
      created: new Date()
    });
    setNewItem("");
  };

  const filteredList = bucketList.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">🪣 Bucket List</h1>

      {/* Form to add new item */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="What do you want to do?"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={addItem}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <Analytics data={bucketList} />

      {/* List */}
      {filteredList.map((item) => (
        <BucketListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default BucketList;