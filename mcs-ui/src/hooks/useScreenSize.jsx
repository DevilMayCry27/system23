import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const detectIfMobile = () => {
    setIsMobile(window.innerWidth < 769);
  };

  useEffect(() => {
    window.addEventListener("resize", detectIfMobile);

    return () => {
      window.removeEventListener("resize", detectIfMobile);
    };
  }, [isMobile]);

  return {
    isMobile,
  };
};

export default useScreenSize;
