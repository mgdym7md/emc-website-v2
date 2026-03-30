import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting: max 3 submissions per minute per IP
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
  rateLimitMap.set(ip, recent)
  if (recent.length >= RATE_LIMIT_MAX) return true
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, interest, message } = body

    // Validation
    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (typeof name !== 'string' || name.length > 255) {
      return NextResponse.json({ error: 'Invalid name.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (typeof message !== 'string' || message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
    }

    // Forward to Strapi
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    const strapiToken = process.env.STRAPI_API_TOKEN

    const strapiRes = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
      },
      body: JSON.stringify({
        data: {
          name,
          email,
          interest,
          message,
          submittedAt: new Date().toISOString(),
          read: false,
        },
      }),
    })

    if (!strapiRes.ok) {
      console.error('[Contact API] Strapi error:', strapiRes.status, await strapiRes.text())
      return NextResponse.json(
        { error: 'Failed to submit. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact API] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
