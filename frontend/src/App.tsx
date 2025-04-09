import { Routes, Route } from 'react-router-dom'
import Contacts from './pages/Contacts'
import { ContactDetail } from './pages/ContactDetail'
import { NewContact } from './pages/NewContact'
import Organizations from './pages/Organizations'
import { OrganizationDetail } from './pages/OrganizationDetail'
import { NewOrganization } from './pages/NewOrganization'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="py-6">
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/new" element={<NewContact />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/new" element={<NewOrganization />} />
          <Route path="/organizations/:id" element={<OrganizationDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
