import { useEffect, useRef,useState } from "react";

export function useClickout<T extends HTMLElement = HTMLElement>(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isOpen, setIsOpen, elementRef };
}