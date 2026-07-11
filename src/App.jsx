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
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Try again.");
      setPassword("");
    }
  };

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
