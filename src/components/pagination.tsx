"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1
          const isCurrentPage = pageNum === currentPage
          const isVisible = Math.abs(pageNum - currentPage) <= 1 || pageNum === 1 || pageNum === totalPages

          if (!isVisible && Math.abs(pageNum - currentPage) === 2) {
            return (
              <span key={`ellipsis-${idx}`} className="text-muted-foreground">
                ...
              </span>
            )
          }

          if (!isVisible) return null

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg transition-colors font-medium text-sm ${
                isCurrentPage ? "bg-accent text-foreground" : "border border-border text-foreground hover:bg-muted"
              }`}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
