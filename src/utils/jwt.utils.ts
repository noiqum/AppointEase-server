import jwt from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    return jwt.sign(object, privateKey, options);
  } catch (error: any) {
    console.error("JWT Sign Error:", error.message);
    throw error;
  }
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return {
      valid: false,
      expired: false,
      decoded: null,
    };
  }
}
