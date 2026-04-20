import { describe, expect, it } from 'vitest'
import { getPackageExportsManifest } from 'vitest-package-exports'
import { resolve } from 'node:path'

describe('exports-manifest', () => {
  it('exposes the root export', async () => {
    const manifest = await getPackageExportsManifest({
      importMode: 'src',
      cwd: resolve(process.cwd()),
    })

    expect(manifest.exports['.']).toBeTruthy()
    expect(manifest.hasTypes).toBe(true)
  })
})
