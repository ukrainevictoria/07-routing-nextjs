'use client';

import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <span>Tag: {note.tag}</span>
    </div>
  );
}