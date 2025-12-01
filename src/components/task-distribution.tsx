'use client'

export function TaskDistribution() {
  const members = [
    { name: 'Jordan', tasks: 12, avatar: '😊', color: '#A78BFA' },
    { name: 'Alex', tasks: 11, avatar: '😎', color: '#60A5FA' },
    { name: 'Casey', tasks: 13, avatar: '🤩', color: '#FBBF24' },
    { name: 'Sam', tasks: 10, avatar: '😄', color: '#34D399' },
  ]

  const maxTasks = 15

  return (
    <div className="border border-border rounded-2xl p-4 md:p-6 bg-card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl md:text-2xl">📊</span>
        <h3 className="font-bold text-base md:text-lg">Task Distribution</h3>
      </div>
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.name}>
            <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
                  {member.avatar}
                </div>
                <span className="font-semibold text-xs md:text-sm truncate">
                  {member.name}
                </span>
              </div>
              <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
                {member.tasks}/15
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${(member.tasks / maxTasks) * 100}%`,
                  backgroundColor: member.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
