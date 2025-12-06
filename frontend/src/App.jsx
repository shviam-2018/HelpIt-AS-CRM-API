import { CaseDisplay } from './components/caseDisplay'
import { PutCaseById } from './components/PutCaseById.jsx'
import { CreateCase } from './components/createCase.jsx'
import { CaseDelete } from './components/caseDelete.jsx'
import './App.css'

function App() {

  return (
    <>
    <div className='overviewOfCase'>
      <h1>Overview of Cases</h1>
      <CaseDisplay />
    </div>
    <div className='caseDetail'>
      <h1>Case Detail</h1>
      <PutCaseById />
    </div>
    <div className='createCase'>
      <h1>Create New Case</h1>
      <CreateCase />
    </div>
    <div className='deleteCase'>
      <h1>Delete Case</h1>
      <CaseDelete />
    </div>
    </>
  )
}

export default App
