import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Jimp } from 'jimp'

const source = resolve('icon-pomotodo.png')
const outputs = [
  { size: 512, path: resolve('public', 'app-icon-512.png') },
  { size: 192, path: resolve('public', 'app-icon-192.png') },
  { size: 96, path: resolve('public', 'app-icon-96.png') },
  { size: 48, path: resolve('public', 'app-icon-48.png') },
  { size: 32, path: resolve('public', 'favicon-32.png') },
  { size: 16, path: resolve('public', 'favicon-16.png') },
]

async function generate() {
  const image = await Jimp.read(source)
  await mkdir(resolve('public'), { recursive: true })

  for (const { size, path } of outputs) {
    const resized = image.clone().resize({ w: size, h: size })
    const buffer = await resized.getBuffer('image/png')
    await writeFile(path, buffer)
    console.log(`created ${path} (${size}x${size})`)
  }

  const appIconPath = resolve('app', 'icon.png')
  await mkdir(resolve('app'), { recursive: true })
  await copyFile(resolve('public', 'app-icon-512.png'), appIconPath)
  console.log(`copied app icon to ${appIconPath}`)
}

generate().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
