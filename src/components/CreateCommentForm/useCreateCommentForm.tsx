import { FormEvent, useState } from 'react';
import { createComment } from '../../api/commentsApi';
import { Comment } from '../../types/Comment';

export function useCreateCommentForm() {
  const [error, setError] = useState('');
  const [createdComments, setCreatedComments] = useState<Comment[]>([]);

  const getFormValues = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const name = formData.get('name');
    const body = formData.get('body');

    return {
      name: typeof name === 'string' ? name : '',
      body: typeof body === 'string' ? body : '',
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = getFormValues(event.currentTarget);

    if (!form.name || !form.body) {
      return;
    }

    event.preventDefault();
    setError('');
    try {
      const newComment = await createComment(form);
      setCreatedComments([...createdComments, newComment]);
    } catch {
      setError('Something went wrong when creating the comment');
    }
  };

  return {
    handleSubmit,
    error,
    createdComments,
  };
}
