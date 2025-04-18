import { useEffect } from "react";

/**
 * @param eventType - Tipo de evento (por ejemplo: 'mousedown', 'keydown')
 * @param handler - Manejador del evento
 * @param target - Target del listener (por defecto `document`)
 */
export function useCleanupListeners<K extends keyof DocumentEventMap>(
  eventType: K,
  handler: (event: DocumentEventMap[K]) => void,
  target: Document | HTMLElement = document
) {
  useEffect(() => {
    target.addEventListener(eventType, handler as EventListener);
    return () => {
      target.removeEventListener(eventType, handler as EventListener);
    };
  }, [eventType, handler, target]);
}