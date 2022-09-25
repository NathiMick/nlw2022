import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div className="flex flex-col">
            <strong className="text-2xl text-white font-black">Não encontrou seu duo?</strong>
            <span className="text-zinc-400">Publique um anúncio para encontrar novos players!</span>
          </div>
            <Dialog.Trigger className="px-4 py-3 hover:bg-violet-600 bg-violet-500 text-white rounded flex items-center gap-3">
              <MagnifyingGlassPlus />
              Publique anúncio
            </Dialog.Trigger>
        </div>
    </div>
  )
}
