


import crypto from 'crypto';
export function generateAccountNumber(): string {
    const accountNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return accountNumber;
  }


  // Deterministic encryption function using a fixed IV
  export function encryptAccountNumberDeterministic(accountNumber: string): string {
    const secretKey = crypto.createHash('sha256').update(process.env.SECRET_KEY || 'default_secret_key').digest(); 
    const iv = Buffer.alloc(16, 0); // Fixed IV (not recommended for high security)
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(accountNumber, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  
  export function decryptAccountNumberDeterministic(encryptedAccountNumber: string): string {
    const secretKey = crypto.createHash('sha256').update(process.env.SECRET_KEY || 'default_secret_key').digest();
    const iv = Buffer.alloc(16, 0); // Fixed IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedAccountNumber, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  
  
  