import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { api } from "~/trpc/server";
import { CreateNote } from "./_components/create-note";

type TNote = {
  title: string;
  body: string;
  id: number;
};

export default async function Home() {
  noStore();
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
    <main className="bg-zinc-800 w-full">
      <div className="container flex flex-row items-start h-screen w-[40%] border-r-2 border-solid  border-r-slate-500">
        <h1 className="">Notes</h1>
        {/* <div className="flex flex-col items-center justify-center"> */}
        {/*   <NotesCrud /> */}
        {/* </div> */}
        <ul className="flex flex-col gap-8 mt-10 w-full">
          {notesList.map((note: TNote) => (
            <NoteItemList note={note} key={note.id} />
          ))}
          <Link href={`/note/${hello.title}`} key={hello.id} className="border-b-slate-600 border-b-2 w-[96%]">
            <h1 className="font-bold text-gray-300">{hello.title}</h1>
            <p className="text-slate-500 mt-4">{hello.body}</p>
          </Link>
        </ul>
        <div className="flex items-start align-bottom text-white text-2xl mr-4">
          <p>+</p>
        </div>
      </div>
    </main>
  );
}

async function NotesCrud() {
  const latestNote = await api.note.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestNote ? (
        <p className="truncate">Your most recent post: {latestNote.title}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreateNote />
    </div>
  );
}

function NoteItemList(props: {
  note: TNote
}) {
  return (
    <div>
      <Link href={`/note/${props.note.title}`} key={props.note.id} className="">
        <h1 className="font-bold text-gray-300">{props.note.title}</h1>
        <p className="kltext-gray-400 mt-4">{props.note.body}</p>
      </Link>
    </div>
  )
}


