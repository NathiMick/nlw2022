import { useEffect, useState } from "react";
import axios from "axios";

import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo.svg";
import "./styles/main.css";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios(`${import.meta.env.VITE_API_URL}/games`)
    .then((res) => {
      setGames(res.data)
    }).finally(() => setLoading(false))
  }, []);

  return <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
    <img src={logoImg} alt="eSports Logo" />
    {
      !!loading ? (
        <span>loading...</span>
      ) : (
        <>
          <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
      
          <div className="grid grid-cols-6 gap-6 mt-6">
            {games.length > 0 && (
              games.map((game) => <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />)
            )}
          </div>
          <Dialog.Root>
            <CreateAdBanner />
            <CreateAdModal />
          </Dialog.Root>
        </>
      )
    }
  </div>
}

export default App
