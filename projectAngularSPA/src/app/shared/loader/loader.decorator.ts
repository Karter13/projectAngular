import { HttpHeaders } from "@angular/common/http";

export function loader(): MethodDecorator {
  return function(target: Function, key: string, descriptor: any) {
    const headers = new HttpHeaders({ 'x-loader': 'true' });
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      args.push(headers);
      const result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  }
}
