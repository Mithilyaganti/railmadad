import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GrievanceForm, ChatBot, TrackComplaint, Feedback } from './pages';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<GrievanceForm />} />
          <Route path="/raise-grievance" element={<GrievanceForm />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/track-complaint" element={<TrackComplaint />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;