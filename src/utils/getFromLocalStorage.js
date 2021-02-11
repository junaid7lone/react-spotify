export default function (id, localData) {
  return localData.some((item) => item.id === id);
}
