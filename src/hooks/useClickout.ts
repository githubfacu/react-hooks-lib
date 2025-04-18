import { useRef,useState } from "react";

import { useCleanupListeners } from "./useCleanupListeners";

export function useClickout<T extends HTMLElement = HTMLElement>(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const elementRef = useRef<T | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useCleanupListeners("mousedown", handleClickOutside);

  return { isOpen, setIsOpen, elementRef };
}