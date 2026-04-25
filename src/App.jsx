import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell/AppShell.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import TopicsPage from './pages/TopicsPage/TopicsPage.jsx'
import RulesPage from './pages/RulesPage/RulesPage.jsx'
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage.jsx'
import BadgesPage from './pages/BadgesPage/BadgesPage.jsx'
import TopicPlayPage from './pages/TopicPlayPage/TopicPlayPage.jsx'
import MenuPage from './pages/MenuPage/MenuPage.jsx'
import CompletePage from './pages/CompletePage/CompletePage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="/menu-page" element={<MenuPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/play/:topicId" element={<TopicPlayPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
