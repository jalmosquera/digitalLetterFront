import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Node 25 exposes an incomplete localStorage global that takes precedence over jsdom's.
const storage = new Map();
const localStorageMock = {
  get length() {
    return storage.size;
  },
  clear: () => storage.clear(),
  getItem: key => storage.get(String(key)) ?? null,
  key: index => [...storage.keys()][index] ?? null,
  removeItem: key => storage.delete(String(key)),
  setItem: (key, value) => storage.set(String(key), String(value)),
};

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});

afterEach(() => {
  cleanup();
});
