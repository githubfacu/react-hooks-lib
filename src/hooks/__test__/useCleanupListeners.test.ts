import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { useCleanupListeners } from "../useCleanupListeners";

describe("useCleanupListeners", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("debería agregar el event listener al montar", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");

    const handler = vi.fn();
    renderHook(() => useCleanupListeners("mousedown", handler));

    expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });

  it("debería remover el event listener al desmontar", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const handler = vi.fn();
    const { unmount } = renderHook(() => useCleanupListeners("mousedown", handler));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });

  it("debería ejecutar el handler al disparar el evento", () => {
    const handler = vi.fn();

    renderHook(() => useCleanupListeners("mousedown", handler));

    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

    expect(handler).toHaveBeenCalled();
  });
});