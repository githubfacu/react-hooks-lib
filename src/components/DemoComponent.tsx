import { withTraking } from "../HoC"

const Component = () => {

  return (
    <div>DemoComponent</div>
  )
}

export const DemoComponent = withTraking(Component)