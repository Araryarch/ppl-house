"use client"

import { useHouseholdStore } from "@/store/household-store"

export function useMembers() {
  const members = useHouseholdStore((state) => state.members)
  const chores = useHouseholdStore((state) => state.chores)
  const addMember = useHouseholdStore((state) => state.addMember)

  const getMemberById = (id: string) => {
    return members.find((m) => m.id === id)
  }

  const getTopContributor = () => {
    return members.reduce((prev, current) => (prev.tasksCompleted > current.tasksCompleted ? prev : current))
  }

  const getMemberStats = (id: string) => {
    const member = getMemberById(id)
    if (!member) return null

    const assignedChores = chores.filter((c) => c.assignedTo === id)
    const completedChores = assignedChores.filter((c) => c.completed)

    return {
      ...member,
      totalAssigned: assignedChores.length,
      totalCompleted: completedChores.length,
      completionRate: assignedChores.length ? Math.round((completedChores.length / assignedChores.length) * 100) : 0,
    }
  }

  const getMembersByContribution = () => {
    return [...members].sort((a, b) => b.tasksCompleted - a.tasksCompleted)
  }

  return {
    members,
    getMemberById,
    getTopContributor,
    getMemberStats,
    getMembersByContribution,
    addMember,
  }
}
