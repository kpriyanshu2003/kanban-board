import bcrypt from "bcrypt";

/**
 * Hash a plaintext password.
 * @param {string} password - The plaintext password.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare a plaintext password with a hashed password.
 * @param {string} password - The plaintext password.
 * @param {string} hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} True if the passwords match, otherwise false.
 */
const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
