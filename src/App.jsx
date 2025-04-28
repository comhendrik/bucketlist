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
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      const q = query(collection(db, "bucketlist"), orderBy("created", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        setBucketList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsub();
    }
  }, [authenticated]);

  const addItem = async () => {
    if (!newItem || !author) return;
    await addDoc(collection(db, "bucketlist"), {
      text: newItem,
      author,
      done: false,
      created: new Date()
    });
    setNewItem("");
    setAuthor("");
  };

  const filteredList = bucketList.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogin = () => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Try again.");
      setPassword("");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">🔒 Enter Password</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-xs p-2 border rounded mb-2"
        />
        <button
          onClick={handleLogin}
          className="w-full max-w-xs bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    );
  }

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
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
          placeholder="Search items or authors..."
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

export default App;
