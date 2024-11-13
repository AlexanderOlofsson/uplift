import { useLocation } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  const location = useLocation(); // Which state
  const showRegister = location.state?.showRegister || false;

  return (
    <div>
      <Login defaultRegisterState={showRegister} />
    </div>
  );
};

export default LoginPage;
