import './App.css';
import { Routes, Route } from 'react-router';
import Home from "./pages/Home";

const App = () => {
    return (
        <Routes>
            <Route index path='/' element={<Home />}></Route>
        </Routes>
    );
}

export default App;

