import { useState } from "react";
import { Textarea, Button } from '@tremor/react';
import JournalService from "../services/JournalService";


export default function Journal() {
  const [text, setText] = useState("null");

  const handleSubmit = async () => {
    await JournalService.createJournalEntry(text);
  };

  return (
    <div>
      <Textarea placeholder="Text schreiben" className="mx-auto max-w-xs" />
      <div className="flex justify-center">
        <Button variant="primary">Eintrag absenden</Button>
      </div>
    </div>
  );
}