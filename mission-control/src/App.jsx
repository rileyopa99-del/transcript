import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import OverviewTab from './components/tabs/OverviewTab'
import TasksTab from './components/tabs/TasksTab'
import ArchitectureTab from './components/tabs/ArchitectureTab'
import AgentChatTab from './components/tabs/AgentChatTab'
import OutreachTab from './components/tabs/OutreachTab'
import IdeasTab from './components/tabs/IdeasTab'
import { useProjectState } from './hooks/useProjectState'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const { state, error, loading } = useProjectState()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base font-mono text-sm text-slate-500">
        Loading project_state.json…
      </div>
    )
  }

  if (error || !state) {
    return (
      <div className="flex h-screen items-center justify-center bg-base px-6 font-mono text-sm text-red-400">
        Failed to load project_state.json{error ? `: ${error}` : ''}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base text-slate-100">
      <Sidebar
        projectName={state.project_name}
        health={state.health}
        phase={state.current_phase}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      <div className="ml-60 flex min-h-screen flex-col">
        <TopBar activeTab={activeTab} phase={state.current_phase} lastUpdated={state.last_updated} />

        <main className="flex-1 px-6 py-6">
          {activeTab === 'overview' && <OverviewTab state={state} />}
          {activeTab === 'tasks' && <TasksTab state={state} />}
          {activeTab === 'architecture' && <ArchitectureTab state={state} />}
          {activeTab === 'agent-chat' && <AgentChatTab state={state} />}
          {activeTab === 'outreach' && <OutreachTab state={state} />}
          {activeTab === 'ideas' && <IdeasTab state={state} />}
        </main>
      </div>
    </div>
  )
}

export default App
