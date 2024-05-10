import '../styles/tailwind.css'; // Ensure this path is correct
import Navbar from '../components/Navbar';
import { AuthProvider } from '../contexts/AuthContext';
import { UserProvider } from '../contexts/UserContext';
import { TarotProvider } from '../contexts/TarotContext';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
      <TarotProvider>
        <Navbar />
        <Component {...pageProps} />
        </TarotProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
