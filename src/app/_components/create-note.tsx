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
      className="flex flex-col gap-2 mr-4 w-full"
    >
      <input
        type="text"
        placeholder="Title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        className=""
      />
      <button
        type="submit"
        className=""
        disabled={createNote.isLoading}
      >
        {createNote.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
