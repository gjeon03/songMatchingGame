export const handleBoardItems = (items, pageNumber) => {
  let tmp = [];
  const len = items.length;
  if (!pageNumber) {
    for (let i = 0; i < 5; i++) {
      tmp.push(items[i]);
    }
    return tmp;
  }
};
