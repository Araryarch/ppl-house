import { create } from 'zustand'

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
  frequency: 'Daily' | 'Weekly' | 'Bi-weekly'
  assignedTo: string
  icon: string
  dueDate: string
  completed: boolean
  rotationOrder: number
}

export interface Notification {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  message: string
  memberId?: string
  timestamp: Date
  read: boolean
}

interface HouseholdState {
  householdName: string
  members: Member[]
  chores: Chore[]
  notifications: Notification[]
  addChore: (chore: Chore) => void
  updateChore: (chore: Chore) => void
  deleteChore: (choreId: string) => void
  completeChore: (choreId: string) => void
  rotateChores: () => void
  addMember: (member: Member) => void
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => void
  removeNotification: (notificationId: string) => void
  markNotificationAsRead: (notificationId: string) => void
}

export const useHouseholdStore = create<HouseholdState>((set) => ({
  householdName: 'Apartment 4B',
  members: [
    {
      id: '1',
      name: 'Jordan',
      email: 'jordan@example.com',
      avatar: '😊',
      color: '#A78BFA',
      tasksCompleted: 52,
      tasksAssigned: 12,
      totalTasks: 81,
      joinedDate: 'Jan 15, 2024',
    },
    {
      id: '2',
      name: 'Alex',
      email: 'alex@example.com',
      avatar: '😎',
      color: '#60A5FA',
      tasksCompleted: 48,
      tasksAssigned: 11,
      totalTasks: 81,
      joinedDate: 'Jan 15, 2024',
    },
    {
      id: '3',
      name: 'Casey',
      email: 'casey@example.com',
      avatar: '🤩',
      color: '#FBBF24',
      tasksCompleted: 49,
      tasksAssigned: 13,
      totalTasks: 81,
      joinedDate: 'Feb 1, 2024',
    },
    {
      id: '4',
      name: 'Sam',
      email: 'sam@example.com',
      avatar: '😄',
      color: '#34D399',
      tasksCompleted: 43,
      tasksAssigned: 10,
      totalTasks: 81,
      joinedDate: 'Feb 10, 2024',
    },
  ],
  chores: [
    {
      id: '1',
      name: 'Wash Dishes',
      description: 'Clean all dishes, pots, and pans',
      frequency: 'Daily',
      assignedTo: '1',
      icon: '🍽️',
      dueDate: 'Today, 6:00 PM',
      completed: false,
      rotationOrder: 1,
    },
    {
      id: '2',
      name: 'Take Out Trash',
      description: 'Take trash and recycling to bins',
      frequency: 'Weekly',
      assignedTo: '2',
      icon: '🗑️',
      dueDate: 'Dec 3, 8:00 PM',
      completed: false,
      rotationOrder: 2,
    },
    {
      id: '3',
      name: 'Vacuum Living Room',
      description: 'Vacuum all carpets and rugs',
      frequency: 'Weekly',
      assignedTo: '4',
      icon: '🧹',
      dueDate: 'Dec 4, 10:00 AM',
      completed: false,
      rotationOrder: 3,
    },
    {
      id: '4',
      name: 'Mop Kitchen Floor',
      description: 'Mop and clean kitchen floor',
      frequency: 'Bi-weekly',
      assignedTo: '3',
      icon: '🧽',
      dueDate: 'Dec 8, 11:00 AM',
      completed: false,
      rotationOrder: 4,
    },
  ],
  notifications: [],
  addChore: (chore) => set((state) => ({ chores: [...state.chores, chore] })),
  updateChore: (updatedChore) =>
    set((state) => ({
      chores: state.chores.map((c) =>
        c.id === updatedChore.id ? updatedChore : c,
      ),
    })),
  deleteChore: (choreId) =>
    set((state) => ({
      chores: state.chores.filter((c) => c.id !== choreId),
    })),
  completeChore: (choreId) =>
    set((state) => {
      const chore = state.chores.find((c) => c.id === choreId)
      const member = state.members.find((m) => m.id === chore?.assignedTo)

      return {
        chores: state.chores.map((c) =>
          c.id === choreId ? { ...c, completed: true } : c,
        ),
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: 'success',
            title: 'Chore Completed',
            message: `${member?.name} completed "${chore?.name}"`,
            memberId: member?.id,
            timestamp: new Date(),
            read: false,
          },
        ],
      }
    }),
  rotateChores: () =>
    set((state) => {
      const members = state.members
      return {
        chores: state.chores.map((chore) => {
          const currentMemberIndex = members.findIndex(
            (m) => m.id === chore.assignedTo,
          )
          const nextMemberIndex = (currentMemberIndex + 1) % members.length
          return {
            ...chore,
            assignedTo: members[nextMemberIndex].id,
            completed: false,
          }
        }),
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            type: 'info',
            title: 'Chores Rotated',
            message:
              'All chores have been rotated to the next household member',
            timestamp: new Date(),
            read: false,
          },
        ],
      }
    }),
  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        },
      ],
    })),
  removeNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== notificationId),
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      ),
    })),
}))
