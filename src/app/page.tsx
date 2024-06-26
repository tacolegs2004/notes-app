import Link from "next/link";
import { api } from "~/trpc/server";
import { type TNote } from "~/types/NoteType";
import { CreateNote } from "./_components/create-note";

export default async function Home() {
  // noStore()i;

  type TTest = {
    id: number
    name: string
  }

  const hello = await api.note.create.mutate({
    title: "New note",
    body: "New note",
  });

  const notesList: TNote[] = [
    {
      title: "First note header",
      body: "First note body",
      id: 1,
    },
    {
      title: "Second note header",
      body: "Second note body",
      id: 2,
    },
    {
      title: "Third note header",
      body: "Third note body",
      id: 3,
    },
  ];

  return (
    <main className="w-[420px]">
      <section className="border-r-2 border-r-gray-400 pr-4">
        <section className="flex flex-col justify-start align-top">
          <NotesCrud />
        </section>
        <div className="container mt-4 flex h-screen flex-row items-start">
          <h1 className="pl-12 pt-2 text-2xl font-bold text-white">Notes</h1>
          <ul className="-ml-14 mt-16 flex w-full flex-col gap-8">
            {notesList.map((note: TNote) => (
              <NoteItemList note={note} key={note.id} />
            ))}
            <Link
              href={`/note/${hello.title}`}
              key={hello.id}
              className="w-[96%]"
            >
              <h1 className="font-bold text-gray-300">{hello.title}</h1>
              <p className="mt-4 text-gray-400">{hello.body}</p>
            </Link>
          </ul>
          <div className="mr-4 flex items-start align-bottom text-2xl text-white">
            <p>+</p>
          </div>
        </div>
      </section>
    </main>
  );
}

async function NotesCrud() {
  const latestNote = await api.note.getLatest.query();

  const newNote = await api.note.create.mutate(latestNote);

  return (
    <span className="ml-4 w-full max-w-xs">
      {latestNote ? (
        <p className="truncate text-slate-100">{newNote.title}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreateNote />
    </span>
  );
}

function NoteItemList(props: { note: TNote }) {
  return (
    <div className="border-b-slate-600">
      <Link href={`/note/${props.note.title}`} key={props.note.id} className="">
        <h1 className="font-bold text-gray-300">{props.note.title}</h1>
        <p className="mt-4 text-gray-400">{props.note.body}</p>
      </Link>
    </div>
  );
}
