import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `Quick Food - ${title}`;
  }, [title]);
};

export default usePageTitle;
