import { Machine,  Service, interpret } from "robot3";
import {  createSignal } from "solid-js";

const { create, freeze } = Object;

function valueEnumerable(value: any) {
  return { enumerable: true, value };
}

type Current<M extends Machine> = {
  name: string;
  state: M["state"];
  context: M["context"];
  service: Service<M>;
}
function createCurrent<M extends Machine>(service: Service<M>): Current<M> {
  return freeze(create(service.machine.state, {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    context: valueEnumerable(service.context || {}),
    service: valueEnumerable(service)
  }));
}

export const useMachine = <M extends Machine>(providedMachine: M, initialContext: M["context"]) => {
  const service = interpret(providedMachine, service => {
      setCurrent(createCurrent(service));
    }, initialContext);
  const [current, setCurrent] = createSignal<Current<M>>(createCurrent(service));

  return [current, service.send, service] as const
}
