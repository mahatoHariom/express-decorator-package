import { diContainer } from "../diContainer";


export function Injectable(): ClassDecorator {
  return (target: any) => {
    diContainer.get(target);
  };
}
