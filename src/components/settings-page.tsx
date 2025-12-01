'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useChores } from '@/hooks/use-chores'
import { useMembers } from '@/hooks/use-members'
import { useHouseholdStore } from '@/store/household-store'
import { EditChoreForm } from './edit-chore-form'
import { AddChoreForm } from './add-chore-form'

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    'chores' | 'members' | 'household' | 'notifications'
  >('chores')
  const { chores } = useChores()
  const { members } = useMembers()
  const addNotification = useHouseholdStore((state) => state.addNotification)

  const handleRemoveMember = (memberId: string, memberName: string) => {
    addNotification({
      type: 'info',
      title: 'Member Removed',
      message: `${memberName} has been removed from the household`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Settings
        </h2>
        <p className="text-xs text-muted-foreground">
          Manage your household preferences
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-border pb-0">
        {(['chores', 'members', 'household', 'notifications'] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-3 font-medium border-b-2 transition-colors whitespace-nowrap text-xs md:text-sm ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ),
        )}
      </div>

      {activeTab === 'chores' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">
              Chores
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Manage your household chores
            </p>

            <div className="space-y-3 mb-6">
              {chores.map((chore) => (
                <EditChoreForm key={chore.id} chore={chore} />
              ))}
            </div>

            <AddChoreForm />
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            Members
          </h3>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="border border-border rounded-lg p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-card"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 font-semibold text-card"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {member.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id, member.name)}
                  className="text-muted-foreground hover:text-red-400 transition-colors text-xs font-medium w-full sm:w-auto flex items-center justify-center sm:justify-start gap-1.5"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'household' && (
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            Household Settings
          </h3>
          <div className="border border-border rounded-lg p-4 bg-card">
            <label className="block mb-4">
              <span className="font-semibold text-sm mb-2 block text-foreground">
                Household Name
              </span>
              <input
                type="text"
                defaultValue="Apartment 4B"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </label>
            <label className="block mb-4">
              <span className="font-semibold text-sm mb-2 block text-foreground">
                Default Rotation Strategy
              </span>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                <option>Sequential</option>
                <option>Load Balanced</option>
                <option>Smart</option>
              </select>
            </label>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            Notifications
          </h3>
          <div className="border border-border rounded-lg p-4 bg-card space-y-3">
            <label className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-xs md:text-sm text-foreground">
                New chore assigned to me
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-xs md:text-sm text-foreground">
                Chore due reminder
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-xs md:text-sm text-foreground">
                Weekly household summary
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
