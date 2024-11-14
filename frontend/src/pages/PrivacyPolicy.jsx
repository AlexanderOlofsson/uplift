import './PrivacyPolicy.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function PrivacyPolicy() {
    const navigate = useNavigate();
    return (
        <>
           <header className="header">
                <h1 className="symbol">Uplift</h1>
            </header>
        <div className="privacy-policy-container">
            <h1>Privacy Policy for Uplift</h1>
            <p>
                At Uplift, we value your privacy and are committed to protecting your personal data. This policy explains how we collect, manage, and protect your information in accordance with GDPR principles.
            </p>
            
            <div className="policy-section">
                <h2>1. Collection and Use of Personal Data</h2>
                <p>
                    When you register on Uplift, we collect the following information:
                </p>
                <ul>
                    <li><strong>Name:</strong> To identify you as a user.</li>
                    <li><strong>Birthdate:</strong> To verify your age.</li>
                    <li><strong>Username:</strong> To enable you to log in.</li>
                    <li><strong>Email Address:</strong> For account support and password recovery.</li>
                </ul>
                <p>
                    This data is used solely to provide our services and ensure proper handling of personal information.
                </p>
            </div>

            <div className="policy-section">
                <h2>2. Principles for Our Processing of Your Personal Data</h2>
                <p><strong>Lawfulness, Fairness, and Transparency:</strong> We collect and process your data based on a legal foundation and are transparent about its use.</p>
                <p><strong>Purpose Limitation:</strong> We use your personal data only for authentication, profile management, and account support.</p>
                <p><strong>Data Minimization:</strong> We collect only the necessary data to provide our services.</p>
                <p><strong>Accuracy:</strong> We ensure that your information is accurate and up-to-date.</p>
                <p><strong>Storage Limitation:</strong> Your data is stored only as long as your account is active.</p>
                <p><strong>Integrity and Confidentiality:</strong> We take security measures to protect your information.</p>
                <p><strong>Accountability:</strong> Uplift is responsible for adhering to and demonstrating compliance with these principles.</p>
            </div>

            <div className="policy-section">
                <h2>3. Your Rights</h2>
                <ul>
                    <li>Right of Access: You may request information about the data we have stored about you.</li>
                    <li>Right to Rectification: You may request that we correct inaccurate information.</li>
                    <li>Right to Erasure: If you choose to close your account, we will delete all personal data associated with you.</li>
                </ul>
            </div>
            <button 
                className="return-button" 
                onClick={() => navigate('/dashboard')}
            >
                Return to Dashboard
            </button>
         </div>
          <Footer />
          </>
    );
}

export default PrivacyPolicy;
