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
