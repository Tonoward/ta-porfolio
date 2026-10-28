import Image from "next/image";

//Components
import Card from "./components/Card";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
    <NavBar />
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Button style
        </h1>
        <button className="button">Click me</button>

        <h1 className="text-4xl font-semibold text-black dark:text-white">
          Card component
        </h1>
        <Card 
          Tags={["frontend", "backend", "ai"]}
          Title="Card Title"
          Img=""
          Description=""
        />
    </div>
    </>
  );
}
