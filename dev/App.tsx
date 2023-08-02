import { type Component } from 'solid-js'
import { createMachine, invoke, reduce, state, transition } from 'robot3'
import {useMachine} from "../src";

const machine = createMachine({
  idle: state(
    transition("click", "loading")
  ),
  loading: invoke(async () => new Promise(resolve => setTimeout(() => resolve(["user1", "user5"]), 1000)),
    transition("done", "loaded", reduce((ctx: any, ev:any) => ({ ...ctx, users: ev.data })))),
  loaded: state()
}, () => ({users: []}))

const App: Component = () => {
  const [current, send] = useMachine( machine, {users: []})

  return (
    <div>
      <div>
      {current()?.name}
      </div>
      <div>
      {current()?.context.users?.join(", ")}
      </div>
      <button onClick={() => send("click")}>Load</button>
    </div>
  )
}

export default App
