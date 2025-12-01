"use client"

import { useState } from "react"

interface InviteMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const [copied, setCopied] = useState(false)
  const inviteLink = "https://chorewheel.app/invite/apartment4b"

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Invite Member</h2>
            <p className="text-xs text-muted-foreground mt-1">Share the invite link to add members</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-2">Invite Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground text-xs truncate"
              />
              <button
                onClick={handleCopy}
                className="bg-accent text-foreground px-3 py-2 rounded-lg font-medium hover:bg-accent/80 transition-colors text-xs whitespace-nowrap"
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
            {copied && <p className="text-xs text-accent mt-2">Copied to clipboard!</p>}
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Anyone with this link can join your household chore management system.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
