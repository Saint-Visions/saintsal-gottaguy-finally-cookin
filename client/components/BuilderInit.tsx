'use client'

import { useEffect } from 'react'

export function BuilderInit() {
  useEffect(() => {
    // Builder.io components are auto-initialized with the new SDK
    // Component registration is handled in the root builder-registry.ts
    console.log("Builder.io initialized")
  }, [])

  return null // This component doesn't render anything
}
