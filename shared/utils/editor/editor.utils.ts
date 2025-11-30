export function calculateReadingTime(article) {
  if (!article || !Array.isArray(article) || article.length === 0) {
    return 0;
  }

  let totalCharacters = 0;
  let totalImages = 0;

  const countCharacters = (content) => {
    content.forEach((item) => {
      if (item.type === 'text' && item.text) {
        totalCharacters += item.text.trim().length;
      } else if (item.type === 'image') {
        totalImages+=1;
      } else if (item.content && item.content.length > 0) {
        countCharacters(item.content);
      }
    });
  };
  
  
  countCharacters(article);
  
  const charactersPerImage = 150;
  const totalCharactersWithImages = totalCharacters + totalImages * charactersPerImage;

  const charactersPerMinute = 1500;
  const readingTime = Math.ceil(totalCharactersWithImages / charactersPerMinute);
  return readingTime;
}


export async function URLtoFile(url, fileName) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await res.blob();

    const mime = blob.type;
    const ext = mime.slice(mime.lastIndexOf('/') + 1, mime.length);

    return new File([blob], `${fileName}.${ext}`, {
      type: mime,
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

// async function URLtoFile(url, fileName) {
//   const res = await fetch(url);
//   const blob = await res.blob();

//   const mime = blob.type;
//   const ext = mime.slice(mime.lastIndexOf('/') + 1, mime.length);

//   return new File([blob], `${fileName}.${ext}`, {
//     type: mime,
//   });
// }