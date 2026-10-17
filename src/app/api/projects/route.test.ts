import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('GET /api/projects', () => {
  it('returns 200 with a JSON body', async () => {
    const res = await GET(new Request('http://localhost/api/projects'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toBeDefined()
  })
})
