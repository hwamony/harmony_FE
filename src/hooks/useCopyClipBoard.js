import { useState } from 'react';

const useCopyClipBoard = () => {
  const [isCopied, setIsCopied] = useState(false);
  
  const onCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      return true;
    } catch (err) {
      console.log(err);
      setIsCopied(false);
      return false;
    }
  };
  return [isCopied, onCopy];
};

export default useCopyClipBoard;
