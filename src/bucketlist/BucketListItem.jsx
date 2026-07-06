import { motion } from "framer-motion";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";

const BucketListItem = ({ item }) => {
  const [isDone, setIsDone] = useState(item.done);

  const toggleDone = async () => {
    const ref = doc(db, "bucketlist", item.id);
    await updateDoc(ref, { done: !isDone });
    setIsDone(!isDone);
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, "bucketlist", item.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center"
    >
      <div>
        <h3 className={`text-lg font-bold ${isDone ? 'line-through text-gray-400' : ''}`}>
          {item.text}
        </h3>
        <p className="text-sm text-gray-500">Added by: {item.author}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={toggleDone} className="text-green-600">✅</button>
        <button onClick={deleteItem} className="text-red-600">🗑️</button>
      </div>
    </motion.div>
  );
};

export default BucketListItem;
