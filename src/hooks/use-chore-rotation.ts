"use client"

import { useHouseholdStore } from "@/store/household-store"
import type { Chore, Member } from "@/store/household-store"

interface RotationStrategy {
  name: string
  rotate: (chores: Chore[], members: Member[]) => Chore[]
}

// Sequential rotation strategy
const sequentialRotation: RotationStrategy = {
  name: "Sequential",
  rotate: (chores: Chore[], members: Member[]) => {
    return chores.map((chore) => {
      const currentIndex = members.findIndex((m) => m.id === chore.assignedTo)
      const nextIndex = (currentIndex + 1) % members.length
      return {
        ...chore,
        assignedTo: members[nextIndex].id,
        completed: false,
      }
    })
  },
}

// Load-balanced rotation strategy
const loadBalancedRotation: RotationStrategy = {
  name: "Load Balanced",
  rotate: (chores: Chore[], members: Member[]) => {
    const memberLoad = members.map((m) => ({
      ...m,
      choreCount: chores.filter((c) => c.assignedTo === m.id).length,
    }))

    return chores.map((chore) => {
      const sortedByLoad = memberLoad.sort((a, b) => a.choreCount - b.choreCount)
      const leastBusyMember = sortedByLoad[0]

      return {
        ...chore,
        assignedTo: leastBusyMember.id,
        completed: false,
      }
    })
  },
}

// Round-robin with completion time consideration
const smartRotation: RotationStrategy = {
  name: "Smart (Least Completed)",
  rotate: (chores: Chore[], members: Member[]) => {
    return chores.map((chore) => {
      const membersByCompletion = [...members].sort((a, b) => a.tasksCompleted - b.tasksCompleted)
      const leastActive = membersByCompletion[0]

      return {
        ...chore,
        assignedTo: leastActive.id,
        completed: false,
      }
    })
  },
}

export function useChoreRotation() {
  const rotateChores = useHouseholdStore((state) => state.rotateChores)

  const strategies: Record<string, RotationStrategy> = {
    sequential: sequentialRotation,
    loadBalanced: loadBalancedRotation,
    smart: smartRotation,
  }

  const getStrategy = (name: string): RotationStrategy => {
    return strategies[name] || sequentialRotation
  }

  const getAvailableStrategies = () => {
    return Object.values(strategies).map((s) => s.name)
  }

  const applyRotationStrategy = (strategyName: string, chores: Chore[], members: Member[]) => {
    const strategy = getStrategy(strategyName)
    return strategy.rotate(chores, members)
  }

  return {
    strategies: Object.keys(strategies),
    getAvailableStrategies,
    applyRotationStrategy,
    getStrategy,
    rotateChores,
  }
}
