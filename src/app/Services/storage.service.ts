import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secretKey = CryptoJS.enc.Utf8.parse('ko0JX4/aWlaYy0g+2y4kolzarhfTUGYL'); // Ensure correct format

  constructor() {}

  setItem(key: string, value: string): void {
    try {
      const encryptedValue = this.encrypt(value);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error encrypting and setting item:', error);
    }
  }

  getItem(key: string): string | null {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    try {
      const decryptedValue = this.decrypt(encryptedValue);
      return decryptedValue === 'null' ? null : decryptedValue;
    } catch (error) {
      console.error('Error decrypting value:', error);
      localStorage.removeItem(key); // Remove corrupted value
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private encrypt(value: string): string {
    try {
      return CryptoJS.AES.encrypt(value, this.secretKey, { mode: CryptoJS.mode.ECB }).toString();
    } catch (error) {
      console.error('Error during encryption:', error);
      throw error;
    }
  }

  private decrypt(value: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(value, this.secretKey, { mode: CryptoJS.mode.ECB });
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error('Decryption failed, possibly corrupted data');
      }

      return decrypted;
    } catch (error) {
      console.error('Error during decryption:', error);
      throw new Error('Malformed UTF-8 data or invalid decryption key');
    }
  }
}