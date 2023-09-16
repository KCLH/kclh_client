export function extractDateTime(dateObj: any) {
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  const day = dateObj.getUTCDate();
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();

  return { year, month, day, hours, minutes };
}

// export function extractDateTime(dateObj: string | number | Date) {
//   if (typeof dateObj === "string") {
//     dateObj = new Date(dateObj);
//   }

//   if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
//     // dateObj가 유효한 Date 객체가 아닌 경우 처리
//     throw new Error("Invalid date");
//   }

//   const year = dateObj.getUTCFullYear();
//   const month = dateObj.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1 필요
//   const day = dateObj.getUTCDate();
//   const hours = dateObj.getUTCHours();
//   const minutes = dateObj.getUTCMinutes();

//   return { year, month, day, hours, minutes };
// }
