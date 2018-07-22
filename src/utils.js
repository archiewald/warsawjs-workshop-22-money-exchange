export function isPositiveNumber(price){
  return typeof (price) === 'number' && price > 0;
}

export function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}