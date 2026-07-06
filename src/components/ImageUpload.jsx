import { Card, Title, Button } from "@tremor/react";
import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  return (
    <Card>
      <Title>Upload a Photo</Title>

      <input
        type="file"
        accept="image/*"
        className="mt-4 block w-full text-sm"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
        <p className="mt-4 text-sm text-gray-500">
          Selected: {image.name}
        </p>
      )}

      <Button className="mt-4">
        Upload
      </Button>
    </Card>
  );
}