import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getPackageExportsManifest } from 'vitest-package-exports'

describe('exports-manifest', () => {
  it('exposes the root export', async () => {
    const manifest = await getPackageExportsManifest({
      importMode: 'src',
      cwd: resolve(process.cwd()),
    })

    expect(manifest.exports['.']).toBeTruthy()

    const packageJson = JSON.parse(await readFile(resolve(process.cwd(), 'package.json'), 'utf-8')) as {
      exports?: Record<string, unknown>
    }
    const rootExport = packageJson.exports?.['.'] as { types?: string } | undefined
    expect(rootExport?.types).toBe('./dist/index.d.mts')
  })
})
