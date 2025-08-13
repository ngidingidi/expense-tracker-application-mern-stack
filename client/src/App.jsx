import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import AddExpensePage from './AddExpensePage'
import EditExpensePage from './EditExpensePage'
import NewCurrencyHome from './NewCurrencyHome'
import Help from './HelpPage'
import BarGraph from './BarGraphPage'
import LineChartVisual from './LineChartPage'
import WeatherCheck from './Weather'
import UserProfile from './UserProfilePage'
import UpdateProfilePage from './UpdateProfilePage'

function App() {

      const [expenseToEdit, setExpenseToEdit] = useState([]);

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home setExpenseToEdit={setExpenseToEdit} />}></Route>
            <Route path="/add-expense" element={ <AddExpensePage />}></Route>
            <Route path="/edit-expense" element={ <EditExpensePage expenseToEdit={expenseToEdit} />}></Route>
            <Route path="/convert-currency" element={ <NewCurrencyHome setExpenseToEdit={setExpenseToEdit} />}></Route>
            <Route path="/weather" element={ <WeatherCheck />}></Route>
            <Route path="/profile" element={ <UserProfile />}></Route>
            <Route path="/update-profile" element={ <UpdateProfilePage />}></Route>
            <Route path="/visualize/bar" element={ <BarGraph />}></Route>
            <Route path="/visualize/line" element={ <LineChartVisual />}></Route>
            <Route path="/help" element={ <Help /> }></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
