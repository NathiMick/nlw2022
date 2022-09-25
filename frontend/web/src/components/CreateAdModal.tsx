import { FormEvent, useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from "axios";

import { Check, GameController } from "phosphor-react";
import Input from "./Form/Input";
import { Game } from "../App";

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [voiceChannel, setVoiceChannel] = useState<boolean>(false);


    useEffect(() => {
        setLoading(true);
        axios(`${import.meta.env.VITE_API_URL}/games`)
        .then((res) => {
          setGames(res.data)
        }).finally(() => setLoading(false))
      }, []);

      const handleCreateAd = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            axios.post(`${import.meta.env.VITE_API_URL}/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: voiceChannel
            })
        } catch (error) {
            alert("Erro ao criar o anúncio")
        }
      }    

    return (
        <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
              <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                  <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold" htmlFor="game">Qual o game?</label>
                      <select
                      name="game"
                      id="game"
                      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                      defaultValue=""
                      >
                        <option disabled value="">Selecione o game que deseja jogar</option>
                        {games.map((game) => <option key={game.id} value={game.id}>{game.title}</option>
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name">Seu nome (ou nickname)</label>
                      <Input name="name" id="name" placeholder="Como te chamam dentro do game?" type="text" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                        <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="discord">Qual seu Discord?</label>
                        <Input name="discord" id="discord" type="text" placeholder="Usuario#0000"  />
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="weekDays">Quando costuma jogar?</label>

                        <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-2" value={weekDays} onValueChange={setWeekDays}>
                          <ToggleGroup.Item
                          value="0"
                          title="Domingo"
                          className={`w-8 h-8 rounded ${weekDays.includes("0") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            D
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="1"
                          title="Segunda"
                          className={`w-8 h-8 rounded ${weekDays.includes("1") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            S
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="2"
                          title="Terça"
                          className={`w-8 h-8 rounded ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            T
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="3"
                          title="Quarta"
                          className={`w-8 h-8 rounded ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            Q
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="4"
                          title="Quinta"
                          className={`w-8 h-8 rounded ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            Q
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="5"
                          title="Sexta"
                          className={`w-8 h-8 rounded ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            S
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="6"
                          title="Sádado"
                          className={`w-8 h-8 rounded ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >
                            S
                          </ToggleGroup.Item>
                         </ToggleGroup.Root>
                        
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="hoursStart">Qual horário do dia?</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="time" name="hourStart" id="hourStart" placeholder="De"/>
                          <Input type="time" name="hourEnd" id="hourEnd" placeholder="Até"/>
                        </div>
                      </div>
                    </div>
                    <label className="mt-2 flex gap-2 text-sm items-center">
                      <CheckBox.Root
                      checked={voiceChannel}
                      className="w-6 h-6 p-1 rounded bg-zinc-900"
                      onCheckedChange={(checked) => {
                        if(checked) {
                            setVoiceChannel(true);
                        } else {
                            setVoiceChannel(false);
                        }
                      }}
                      >
                        <CheckBox.Indicator>
                            <Check className="w-4 h-4 text-emerald-400"/>
                        </CheckBox.Indicator>
                      </CheckBox.Root>
                      Costumo me conectar ao chat de voz
                    </label>
                    <footer className="mt-4 flex justify-end gap-4">
                      <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold">Cancelar</Dialog.Close>
                      <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3" type="submit"><GameController />Encontrar duo</button>
                    </footer>
                  </form>
              </Dialog.Content>
            </Dialog.Portal>
    )
    
}