import type { Character } from "../types/character";
import StatusIcon from "./StatusIcon";
import BackToListLink from "./BackToListLink";
import RouteError from "./RouteError";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/Button";
import { useState } from "react";

interface CharacterDetailProps {
  char?: Character;
}

const CharacterDetail = ({ char }: CharacterDetailProps) => {
  const [open, setOpen] = useState(false);

  if (!char) {
    return (
      <>
        <BackToListLink />
        <RouteError />
      </>
    );
  }
  return (
    <>
      <BackToListLink />
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Button type="button" onClick={() => setOpen(true)} className="mb-4">Daha fazla bilgi (Modal)</Button>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-[90vw] max-w-lg">
            <Dialog.Title className="text-2xl font-bold mb-4">{char.name}</Dialog.Title>
            <img
              src={char.img}
              alt={char.name}
              className="w-40 h-40 object-cover rounded mx-auto mb-4"
            />
            <div className="text-gray-800 dark:text-gray-100">
              <p className="my-1"><span className="font-bold">Status: </span>{char.status} <StatusIcon char={char} /></p>
              <p className="my-1"><span className="font-bold">Species: </span>{char.species}</p>
              <p className="my-1"><span className="font-bold">Origin: </span>{char.origin}</p>
              <p className="my-1"><span className="font-bold">No. of episodes: </span>{char.episodes}</p>
            </div>
            <Dialog.Close asChild>
              <Button type="button" className="mt-6 w-full">Kapat</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <article className="flex items-center w-[620px] p-9 bg-cyan-500 rounded-lg shadow-lg dark:bg-gray-800 max-md:flex-col max-md:w-64 max-md:p-4">
        <img
          src={char.img}
          alt={char.name}
          className="w-[230px] rounded-md max-md:order-1"
        />
        <div className="ml-9 p-0 text-left max-md:ml-0 max-md:text-center">
          <h3 className="mt-0 text-2xl font-bold">{char.name}</h3>
          <p className="my-1"><span className="font-bold">Status: </span>{char.status} <StatusIcon char={char} /></p>
          <p className="my-1"><span className="font-bold">Species: </span>{char.species}</p>
          <p className="my-1"><span className="font-bold">Origin: </span>{char.origin}</p>
          <p className="my-1"><span className="font-bold">No. of episodes: </span>{char.episodes}</p>
        </div>
      </article>
    </>
  );
};

export default CharacterDetail; 