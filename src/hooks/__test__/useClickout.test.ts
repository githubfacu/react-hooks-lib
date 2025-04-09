import { act,renderHook } from "@testing-library/react";

import { useClickout } from "../useClickout";

describe("useClickout", () => {

  it("debería inicializarse con el estado proporcionado", () => {
    const { result } = renderHook(() => useClickout(true));
    expect(result.current.isOpen).toBe(true);
  });

  it("debería cerrar el dropdown cuando se hace clic fuera del elemento", () => {
    const { result } = renderHook(() => useClickout(true));
  
    const dropdownElement = document.createElement("div");
    const outsideElement = document.createElement("div");
    document.body.appendChild(dropdownElement);
    document.body.appendChild(outsideElement);
  
    act(() => {
      result.current.elementRef.current = dropdownElement;
    });
  
    act(() => {
      outsideElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
  
    expect(result.current.isOpen).toBe(false);

    document.body.removeChild(dropdownElement);
    document.body.removeChild(outsideElement);
  });

  it("no debería cerrar el dropdown si se hace clic dentro del elemento", () => {
    const { result } = renderHook(() => useClickout(true));
    const mockElement = document.createElement("div");

    act(() => {
      result.current.elementRef.current = mockElement;
      mockElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("debería limpiar el event listener al desmontarse", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useClickout(true));

    expect(addEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });
});