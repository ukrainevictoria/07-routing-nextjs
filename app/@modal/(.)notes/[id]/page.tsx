import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

interface ModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: ModalPageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NotePreviewClient note={note} />;
}