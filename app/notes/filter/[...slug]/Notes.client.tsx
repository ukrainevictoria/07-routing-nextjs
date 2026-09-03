'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { Note, FetchNotesResponse } from '@/types/note';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', { page, search: debouncedSearch, tag }],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
  });

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  if (isLoading) return <div>Loading notes...</div>;
  if (isError) return <div>Error fetching notes</div>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />

      <button onClick={() => setIsModalOpen(true)}>Create Note</button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <NoteList notes={notes} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage: number) => setPage(newPage)}
      />
    </div>
  );
}
