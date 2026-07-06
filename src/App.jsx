import { useState } from "react";
import { Card, Title, Text, Button } from "@tremor/react";
import {
  Home,
  Notebook,
  User,
  Brain,
  Settings,
  List
} from "lucide-react";
import BucketList from "./bucketlist/home";
import DailyMoodCheckIn from "./mood/home";
import Journal from "./journal/home";

const App = () => {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <Card>
            <Title>Home</Title>
            <Text>Willkommen auf der Startseite.</Text>
          </Card>
        );
      case "mood":
        return (
          <Card>
            <Title>Stimmung</Title>
            <Text>Wie fühlst du dich heute?</Text>
            <DailyMoodCheckIn></DailyMoodCheckIn>
          </Card>
        );
      case "notebook":
        return (
          <Card>
            <Title>Journal</Title>
            <Text>Trage hier deine heutigen Gedanken und Erlebnisse ein.</Text>
            <Journal></Journal>
          </Card>
        );
      case "bucketlist":
        return (
          <Card>
            <Title>Bucket List</Title>
            <BucketList></BucketList>
          </Card>
        );

      case "profile":
        return (
          <Card>
            <Title>Profil</Title>
            <Text>Max Mustermann</Text>
          </Card>
        );

      case "settings":
        return (
          <Card>
            <Title>Einstellungen</Title>
            <Button className="mt-4">Speichern</Button>
          </Card>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: "home", icon: Home },
    { id: "mood", icon: Brain },
    { id: "notebook", icon: Notebook },
    { id: "bucketlist", icon: List },
    { id: "profile", icon: User },
    { id: "settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-6">{renderPage()}</div>

      <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-3">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`${
              page === id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Icon size={24} />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
