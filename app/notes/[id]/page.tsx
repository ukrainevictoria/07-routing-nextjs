import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <div className={css.container}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <span>Tag: {note.tag}</span>
    </div>
  );
}