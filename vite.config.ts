import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const firstNonEmpty = (...values: Array<string | undefined>): string | undefined =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0)?.trim()

const toDefineValue = (value: string | undefined): string | undefined =>
  value ? JSON.stringify(value) : undefined
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const emailJsServiceId = firstNonEmpty(
    env.VITE_EMAILJS_SERVICE_ID,
    env.EMAILJS_SERVICE_ID,
    env.SERVICE_ID,
  )
  const emailJsPublicKey = firstNonEmpty(
    env.VITE_EMAILJS_PUBLIC_KEY,
    env.EMAILJS_PUBLIC_KEY,
    env.EMAILJS_KEY,
    env.PUBLIC_KEY,
    env.EMAILJS_USER_ID,
  )
  const emailJsOwnerTemplateId = firstNonEmpty(
    env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
    env.EMAILJS_OWNER_TEMPLATE_ID,
    env.EMAILJS_TEMPLATE_ID,
    env.OWNER_TEMPLATE_ID,
    env.TEMPLATE_ID,
  )
  const emailJsAutoReplyTemplateId = firstNonEmpty(
    env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
    env.EMAILJS_AUTO_REPLY_TEMPLATE_ID,
    env.EMAILJS_REPLY_TEMPLATE_ID,
    env.AUTO_REPLY_TEMPLATE_ID,
  )
  const ownerReceiveEmail = firstNonEmpty(
    env.VITE_OWNER_RECEIVE_EMAIL,
    env.OWNER_RECEIVE_EMAIL,
    env.EMAILJS_OWNER_EMAIL,
    env.CONTACT_RECEIVE_EMAIL,
  )

  const defineEmailJsEnv = {
    ...(toDefineValue(emailJsServiceId)
      ? { 'import.meta.env.VITE_EMAILJS_SERVICE_ID': toDefineValue(emailJsServiceId) }
      : {}),
    ...(toDefineValue(emailJsPublicKey)
      ? { 'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': toDefineValue(emailJsPublicKey) }
      : {}),
    ...(toDefineValue(emailJsOwnerTemplateId)
      ? { 'import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID': toDefineValue(emailJsOwnerTemplateId) }
      : {}),
    ...(toDefineValue(emailJsAutoReplyTemplateId)
      ? { 'import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID': toDefineValue(emailJsAutoReplyTemplateId) }
      : {}),
    ...(toDefineValue(ownerReceiveEmail)
      ? { 'import.meta.env.VITE_OWNER_RECEIVE_EMAIL': toDefineValue(ownerReceiveEmail) }
      : {}),
  }

  return {
    plugins: [react(), tailwindcss()],
    define: defineEmailJsEnv,
    server: {
      port: 3000,
      strictPort: false,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }
})
