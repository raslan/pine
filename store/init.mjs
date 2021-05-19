import create from 'zustand/vanilla'
// Initialize Zustand store, use create.default() to solve problem with ES Modules and MJS files.
const { getState: get, setState: set } = create.default(() => ({
  globalQueue: new Map(),
}))

export { get, set }
