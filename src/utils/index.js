const utils = {
  removeDuplicates(array) {
    return array.filter(
      (currentItem, index, array) =>
        index === array.findIndex(item => item.id === currentItem.id)
    );
  }
};

export default utils;
