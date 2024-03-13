'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CreatePoll() {
  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
  }, []);

  return <div>CreatePoll</div>;
}
