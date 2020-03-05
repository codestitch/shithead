export function ToArray(...objects: any[]) {
   let newArray = [];
   for (const item of objects) {
      let checkArray;
      if (typeof item === 'string') {
         checkArray = !!item ? item.split(','): [];
      } else {
         checkArray = Array.isArray(item) ? item : [];
      }
      newArray = [...newArray, ...checkArray];
   }

   return newArray;
}
