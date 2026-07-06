import { useState } from "react";
import { Textarea, Button } from '@tremor/react';
import ImageUpload from "../components/ImageUpload";


export default function Journal() {
  const [text, setText] = useState("null");

  return (
    <div>
      <Textarea placeholder="Type here..." className="mx-auto max-w-xs" />
      <ImageUpload></ImageUpload>
      <div className="flex justify-center">
        <Button variant="primary">Eintrag absenden</Button>
      </div>
    </div>
  );
}