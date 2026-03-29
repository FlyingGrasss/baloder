// lib/passwordValidation.ts

export const passwordRequirements = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[*_?\/!@#$%^&()+=.\-]/,
};

export function validatePassword(password: string) {
  return {
    length: password.length >= passwordRequirements.minLength,
    uppercase: passwordRequirements.hasUppercase.test(password),
    lowercase: passwordRequirements.hasLowercase.test(password),
    number: passwordRequirements.hasNumber.test(password),
    special: passwordRequirements.hasSpecial.test(password),
  };
}

export function isPasswordValid(password: string) {
  const requirements = validatePassword(password);
  return (
    requirements.length &&
    requirements.uppercase &&
    requirements.lowercase &&
    requirements.number &&
    requirements.special
  );
}
