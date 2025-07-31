import { NextResponse } from 'next/server'
import { getSiteContent } from '@/lib/firebase-admin-service'

export async function GET() {
  try {
    const content = await getSiteContent()
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      contentCount: content.length,
      sections: content.map(item => ({
        section: item.section,
        title: item.title,
        hasPrice: !!item.price,
        hasOldPrice: !!item.oldPrice,
        hasEconomy: !!item.economy,
        updatedAt: item.updatedAt
      }))
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 