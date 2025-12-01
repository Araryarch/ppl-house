"use client"

import { useHouseholdStore } from "@/store/household-store"
import type { Chore } from "@/store/household-store"

export function useChores() {
  const chores = useHouseholdStore((state) => state.chores)
  const addChore = useHouseholdStore((state) => state.addChore)
  const completeChore = useHouseholdStore((state) => state.completeChore)
  const updateChore = useHouseholdStore((state) => state.updateChore)
  const deleteChore = useHouseholdStore((state) => state.deleteChore)

  const getMyChores = (userId: string) => {
    return chores.filter((chore) => chore.assignedTo === userId)
  }

  const getPendingChores = () => {
    return chores.filter((chore) => !chore.completed)
  }

  const getCompletedChores = () => {
    return chores.filter((chore) => chore.completed)
  }

  const createChore = (data: Omit<Chore, "id" | "completed">) => {
    const newChore: Chore = {
      ...data,
      id: `chore_${Date.now()}`,
      completed: false,
    }
    addChore(newChore)
    return newChore
  }

  const completeAndRotate = (choreId: string) => {
    completeChore(choreId)
  }

  const getNextDueChore = () => {
    return chores.filter((c) => !c.completed)[0] || null
  }

  return {
    chores,
    getMyChores,
    getPendingChores,
    getCompletedChores,
    createChore,
    completeAndRotate,
    getNextDueChore,
    updateChore,
    deleteChore,
  }
}
