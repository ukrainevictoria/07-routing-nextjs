'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const router = useRouter();

  return (
    <div className={css.backdrop} onClick={() => router.back()}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={() => router.back()}>
          ✕
        </button>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <span>Tag: {note.tag}</span>
      </div>
    </div>
  );
}