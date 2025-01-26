import './App.css'
import firebaseConfig from './components/Authentication/firebase.config';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './Pages/Registration/Registration'
import Homepage from './components/Homepage/Homepage';
import Login from './Pages/Login/Login';
import Message from './components/Message/Message';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ProfilePage from './components/ProfilePage/ProfilePage';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Registration />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/message' element={<Message/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/profilepage' element={<ProfilePage/>}/>
    </Route>
  )
)


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
