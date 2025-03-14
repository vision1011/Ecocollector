import type React from "react"
export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">{children}</div>
}

