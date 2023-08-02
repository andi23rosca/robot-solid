<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=robot-solid&background=tiles&project=%20" alt="robot-solid">
</p>

# robot-solid

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

Robot3 integration for solid using robot-hooks

## Quick start

Install it:

```bash
npm i robot-solid
# or
yarn add robot-solid
# or
pnpm add robot-solid
```

Use it:

```tsx
import { type Component } from 'solid-js';
import { createMachine, invoke, reduce, state, transition } from 'robot3';
import { useMachine } from 'robot-solid';

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
```
