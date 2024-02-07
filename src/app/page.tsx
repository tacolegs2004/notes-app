// import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

type TNotesList = {
  title: string;
  body: string;
  id: number;
};
export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  const notesList: TNotesList[] = [
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
    <main className="bg-zinc-800">
      <div className="container flex h-screen w-[30%] flex-row items-start border-r-2 border-solid  border-r-slate-500 align-top">
        <ul className="flex flex-col gap-8">
          {notesList.map((note) => (
            <div key={note.id} className="">
              <h1 className="font-bold text-gray-300">{note.title}</h1>
              <p className="mt-4 text-gray-400">{note.body}</p>
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
