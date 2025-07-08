"use client";

import { useEffect, useRef } from "react";

interface ObserveProps {
  threshold?: number;
  actionInView: () => void;
}

const useInView = ({ threshold = 0.1, actionInView }: ObserveProps) => {
  const targetRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    targetRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          actionInView();
          targetRef.current?.disconnect();
        }
      },
      { threshold }
    );

    return () => {
      targetRef.current?.disconnect();
    };
  }, [threshold, actionInView]);

  const observe = (element: HTMLElement) => {
    targetRef.current?.observe(element);
  };

  return { observe };
};

export default useInView;
