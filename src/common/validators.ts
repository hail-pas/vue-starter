interface ValidationResult {
  isValid: boolean;
  error?: "EMPTY" | "INVALID_FORMAT" | "INVALID_LENGTH" | "INVALID_START";
}

export const validatePhoneNumber = (phone: string): ValidationResult => {
  // 清理输入（移除空格和特殊字符）
  const cleanedPhone = phone.replace(/\s+/g, "");

  // 空值检查
  if (!cleanedPhone) {
    return { isValid: false, error: "EMPTY" };
  }

  // 非数字字符检查
  if (!/^\d+$/.test(cleanedPhone)) {
    return { isValid: false, error: "INVALID_FORMAT" };
  }

  // 长度校验
  if (cleanedPhone.length !== 11) {
    return { isValid: false, error: "INVALID_LENGTH" };
  }

  // 号段校验（支持最新号段）
  const validPrefixPattern =
    /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  if (!validPrefixPattern.test(cleanedPhone)) {
    return { isValid: false, error: "INVALID_START" };
  }

  return { isValid: true };
};
