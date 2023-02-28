// this files allows to declare type definition for third party libraries

import * as lodash from 'lodash';

declare module 'lodash' {
  // export function chunck(collection: any, size?: number): any[][];

  // merge lodash interface
  interface LoDashStatic {
    log(item: string): void;
  }
}
