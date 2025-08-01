import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Layout from './components/Layout.tsx';
import Home from './pages/Home';
import About from './pages/About';
import Colleges from './pages/Colleges';
import Universities from './pages/Universities.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import JoinCommunity from './pages/JoinCommunity.tsx';
import Header from './components/Header';
import Resources from './pages/Resources';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/community" element={<JoinCommunity />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}