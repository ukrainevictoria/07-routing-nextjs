'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NotesPage.module.css';
import paginationCss from '@/components/Pagination/Pagination.module.css';
interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, search, tag }],
    queryFn: () => fetchNotes({ page, search, tag }),
  });

  if (isLoading) return <div>Loading notes...</div>;
  if (isError) return <div>Failed to load notes.</div>;

  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.container}>
      <ul className={css.grid}>
        {data?.notes.map((note: Note) => (
          <li key={note.id} className={css.card}>
            <Link href={`/notes/${note.id}`}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Блок пагінації */}
      {totalPages > 1 && (
        <div className={paginationCss.pagination}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}