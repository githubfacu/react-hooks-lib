import { fireEvent, renderHook } from "@testing-library/react"

import { useWindowsResize } from "../windowRezise"

describe('useWindowsResize', () => {
    it('should instance window object', () => {
        const {result} = renderHook(() => useWindowsResize())
        expect(result.current).toStrictEqual({width: 1024, height: 650})
    })
    it('should update on window resize', () => {
        const { result } = renderHook(() => useWindowsResize())
        expect(result.current).toStrictEqual({width: 1024, height: 650})
        global.innerWidth = 500
        global.innerHeight = 300
        fireEvent.resize(window)
        expect(result.current).toStrictEqual({width: 500, height: 300})
    })
    it('should cleanup listener on onmount', () => {
        const {unmount} = renderHook(() => useWindowsResize())
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })
})