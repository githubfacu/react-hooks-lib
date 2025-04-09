import { render, screen } from "@testing-library/react";

import * as useIsVisibleHook from "../../hooks/useIsVisible"
import { withTraking } from "../withTraking";

const MockComponent = () : React.JSX.Element => (
    <>
        <div data-testid='mock-component'>Mock component</div>
    </>
)

const intersectionObserverMock = () => ({
    observe: vi.fn(),
    unobserve: vi.fn()
})

window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)

describe('with traking', () => {

    it('Should render base component', () => {
        const ComponentWithTracker = withTraking(MockComponent)
        render(<ComponentWithTracker/>)
        expect(screen.getByTestId('mock-component')).toBeDefined()
    })

    it("should trigger event when component becomes visible", () => {
        vi.spyOn(useIsVisibleHook, "useIsVisible").mockReturnValue(true)
    
        const eventSpy = vi.spyOn(console, "log")
    
        const ComponentWithTracker = withTraking(MockComponent)
        render(<ComponentWithTracker />)
        expect(eventSpy).toHaveBeenCalled()
        expect(eventSpy).toHaveBeenCalledWith("send tracking event")
        expect(eventSpy).toHaveBeenCalledOnce()
    })

    it("should NOT trigger event when component is NOT visible", () => {
        vi.spyOn(useIsVisibleHook, "useIsVisible").mockReturnValue(false)
        const eventSpy = vi.spyOn(console, "log")
      
        const ComponentWithTracker = withTraking(MockComponent)
        render(<ComponentWithTracker />)
      
        expect(eventSpy).not.toHaveBeenCalled()
    })
})