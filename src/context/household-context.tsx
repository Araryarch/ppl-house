"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Member {
  id: string
  name: string
  email: string
  avatar: string
  color: string
  tasksCompleted: number
  tasksAssigned: number
  totalTasks: number
  joinedDate: string
}

export interface Chore {
  id: string
  name: string
  description: string
  frequency: "Daily" | "Weekly" | "Bi-weekly"
  assignedTo: string
  icon: string
  dueDate: string
  completed: boolean
  rotationOrder: number
}

interface HouseholdContextType {
  householdName: string
  members: Member[]
  chores: Chore[]
  addChore: (chore: Chore) => void
  updateChore: (chore: Chore) => void
  deleteChore: (choreId: string) => void
  completeChore: (choreId: string) => void
  rotateChores: () => void
  addMember: (member: Member) => void
}

const HouseholdContext = createContext<HouseholdContextType | undefined>(undefined)

export function HouseholdProvider({ children }: { children: ReactNode }) {
  const [householdName] = useState("Apartment 4B")
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Jordan",
      email: "jordan@example.com",
      avatar: "😊",
      color: "#A78BFA",
      tasksCompleted: 52,
      tasksAssigned: 12,
      totalTasks: 81,
      joinedDate: "Jan 15, 2024",
    },
    {
      id: "2",
      name: "Alex",
      email: "alex@example.com",
      avatar: "😎",
      color: "#60A5FA",
      tasksCompleted: 48,
      tasksAssigned: 11,
      totalTasks: 81,
      joinedDate: "Jan 15, 2024",
    },
    {
      id: "3",
      name: "Casey",
      email: "casey@example.com",
      avatar: "🤩",
      color: "#FBBF24",
      tasksCompleted: 49,
      tasksAssigned: 13,
      totalTasks: 81,
      joinedDate: "Feb 1, 2024",
    },
    {
      id: "4",
      name: "Sam",
      email: "sam@example.com",
      avatar: "😄",
      color: "#34D399",
      tasksCompleted: 43,
      tasksAssigned: 10,
      totalTasks: 81,
      joinedDate: "Feb 10, 2024",
    },
  ])

  const [chores, setChores] = useState<Chore[]>([
    {
      id: "1",
      name: "Wash Dishes",
      description: "Clean all dishes, pots, and pans",
      frequency: "Daily",
      assignedTo: "1",
      icon: "🍽️",
      dueDate: "Today, 6:00 PM",
      completed: false,
      rotationOrder: 1,
    },
    {
      id: "2",
      name: "Take Out Trash",
      description: "Take trash and recycling to bins",
      frequency: "Weekly",
      assignedTo: "2",
      icon: "🗑️",
      dueDate: "Dec 3, 8:00 PM",
      completed: false,
      rotationOrder: 2,
    },
    {
      id: "3",
      name: "Vacuum Living Room",
      description: "Vacuum all carpets and rugs",
      frequency: "Weekly",
      assignedTo: "4",
      icon: "🧹",
      dueDate: "Dec 4, 10:00 AM",
      completed: false,
      rotationOrder: 3,
    },
    {
      id: "4",
      name: "Mop Kitchen Floor",
      description: "Mop and clean kitchen floor",
      frequency: "Bi-weekly",
      assignedTo: "3",
      icon: "🧽",
      dueDate: "Dec 8, 11:00 AM",
      completed: false,
      rotationOrder: 4,
    },
  ])

  const addChore = (chore: Chore) => {
    setChores([...chores, chore])
  }

  const updateChore = (updatedChore: Chore) => {
    setChores(chores.map((c) => (c.id === updatedChore.id ? updatedChore : c)))
  }

  const deleteChore = (choreId: string) => {
    setChores(chores.filter((c) => c.id !== choreId))
  }

  const completeChore = (choreId: string) => {
    setChores(chores.map((c) => (c.id === choreId ? { ...c, completed: true } : c)))
  }

  const rotateChores = () => {
    setChores(
      chores.map((chore) => {
        const currentMemberIndex = members.findIndex((m) => m.id === chore.assignedTo)
        const nextMemberIndex = (currentMemberIndex + 1) % members.length
        return {
          ...chore,
          assignedTo: members[nextMemberIndex].id,
          completed: false,
        }
      }),
    )
  }

  const addMember = (member: Member) => {
    setMembers([...members, member])
  }

  return (
    <HouseholdContext.Provider
      value={{
        householdName,
        members,
        chores,
        addChore,
        updateChore,
        deleteChore,
        completeChore,
        rotateChores,
        addMember,
      }}
    >
      {children}
    </HouseholdContext.Provider>
  )
}

export function useHousehold() {
  const context = useContext(HouseholdContext)
  if (!context) {
    throw new Error("useHousehold must be used within HouseholdProvider")
  }
  return context
}
