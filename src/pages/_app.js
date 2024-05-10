
import Navbar from '../components/Navbar';
import { AuthProvider } from '../contexts/AuthContext';
import { UserProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
