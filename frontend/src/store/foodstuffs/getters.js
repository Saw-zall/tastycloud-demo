export function getOne (state) {
  return (id) => {
    return state.all[id]
  }
}
