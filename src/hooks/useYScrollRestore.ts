import { useLayoutEffect, useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router";
import useDebounce from "./useDebounce";

function useYScrollRestore({ delay = 300 }: { delay?: number } = {}) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const key = location.pathname;

  const [rawScrollY, setRawScrollY] = useState(() => {
    if (typeof window === "undefined") return 0;

    const stored = sessionStorage.getItem("scrollY:" + key);
    return stored !== null ? Number(stored) : 0;
  });

  const debouncedScrollY = useDebounce({ value: rawScrollY, delay });

  useLayoutEffect(() => {
    if (navigationType === "POP") {
      const saved = sessionStorage.getItem("scrollY:" + key);
      if (saved) {
        window.scrollTo(0, parseInt(saved));
      }
    }
  }, [key, navigationType]);

  useEffect(() => {
    const handleScroll = () => {
      setRawScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("scrollY:" + key, String(debouncedScrollY));
  }, [key, debouncedScrollY]);
}

export default useYScrollRestore;
