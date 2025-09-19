import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ComponentStore } from './component.store';

const initialState: ComponentStore = { count: 0 };

export const ComponentItemStore = signalStore(
  withState(initialState),
  withComputed(({ count }) => ({
    countEven: computed(() => Math.floor(count() % 2) === 0)
  })),
  withMethods((store) => ({
    increment(): void {
      patchState(store, { count: store.count() + 1 });
    },
    decrement(): void {
      patchState(store, { count: store.count() - 1 });
    },
    reset(): void {
      patchState(store, { count: 0 });
    }
  }))
);
