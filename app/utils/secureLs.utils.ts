import { useCookie } from '#app'
import { ENV } from './ENV.utils'

// A tiny, self-contained XOR + base64 obfuscator or standard Web Crypto wrapper
// If you want pure, zero-extra-npm-package symmetric encryption:
const encrypt = (text: string, secret: string): string => {
  if (!text) return ''
  const key = secret || 'default_secret_key'

  const result = text
    .split('')
    .map((c, i) => {
      const keyCharCode = key.charCodeAt(i % key.length)
      return String.fromCharCode(c.charCodeAt(0) ^ keyCharCode)
    })
    .join('')

  return typeof btoa !== 'undefined'
    ? btoa(result)
    : Buffer.from(result, 'binary').toString('base64')
}

const decrypt = (encoded: string, secret: string): string => {
  if (!encoded) return ''
  try {
    const text =
      typeof atob !== 'undefined'
        ? atob(encoded)
        : Buffer.from(encoded, 'base64').toString('binary')

    const key = secret || 'default_secret_key'

    return text
      .split('')
      .map((c, i) => {
        const keyCharCode = key.charCodeAt(i % key.length)
        return String.fromCharCode(c.charCodeAt(0) ^ keyCharCode)
      })
      .join('')
  } catch {
    return ''
  }
}
export const EncryptedStore = {
  set(key: string, value: string): void {
    const cookie = useCookie(key, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })
    cookie.value = encrypt(value, ENV.SECURE_LS)
  },

  get(key: string): string {
    const cookie = useCookie(key)
    return cookie.value ? decrypt(cookie.value as string, ENV.SECURE_LS) : ''
  },

  remove(key: string): void {
    const cookie = useCookie(key, { path: '/' })
    cookie.value = null
  }
}
