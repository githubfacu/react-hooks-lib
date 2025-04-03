import { afterEach, beforeEach, vi } from "vitest"

beforeEach(() => {
    vi.useFakeTimers()
    global.innerWidth = 1024
    global.innerHeight = 650
})

afterEach(() => {
    vi.resetAllMocks()
})