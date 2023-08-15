const UtPassword = {
  validatePassword(password: string) {
    const validationResults = {
      length: password.length >= 8,
      maxLen: password.length <= 64,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      specialCharacter: /[!@#$%^&*]/.test(password),
    };
    return validationResults;
  },

  strongPassword(password: string): boolean {
    const validationResults = UtPassword.validatePassword(password);
    const validationResult = Object.values(validationResults).every(
      (result) => result === true,
    );
    return validationResult;
  },
};
export default UtPassword;