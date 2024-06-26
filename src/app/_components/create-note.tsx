"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateNote() {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setNoteTitle("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createNote.mutate({ noteTitle });
      }}
      className="mr-4 mt-2 flex w-full flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        className="w-64 rounded-md p-1 text-black"
      />
      <button
        type="submit"
        className="text-white"
        disabled={createNote.isLoading}
      >
        {createNote.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
