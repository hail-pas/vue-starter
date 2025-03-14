// import { parse, isValid } from "date-fns";

export function isValidEnum<T extends Record<string, string | number>>(
  enumType: T,
  value: string | number | undefined | null,
): boolean {
  if (value == null) {
    return false;
  }
  return Object.values(enumType).includes(value);
}

// function parseDateWithDateFns(dateString: string): Date | null {
//   const formattedDate = parse(dateString, "yy-MM-dd HH:mm:ss", new Date());
//   return isValid(formattedDate) ? formattedDate : null;
// }
export function setAllPropertiesToUndefined<T extends object>(obj: T) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 使用类型断言（如果明确知道属性存在）
      obj[key as keyof T] = undefined as never;
    }
  }
}
