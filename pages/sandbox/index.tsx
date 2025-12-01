import { useState } from 'react';
import { CreateArticle } from '@/widgets/create-article'; 





export default function Sandbox() {
  const [title, setTitle] = useState("")
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    
  };
  return (
    <>
      <div className="min-h-[700px] my-10">
              <CreateArticle onTitleChange={handleTitleChange} />
      </div>
    </>
  );
}

