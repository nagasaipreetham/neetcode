import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage    from './components/LandingPage/LandingPage';
import PrivacyPolicy  from './pages/PrivacyPolicy';
import Terms          from './pages/Terms';
import CoursesPage    from './pages/CoursesPage';
import ProPage        from './pages/ProPage';
import GiftPage       from './pages/GiftPage';
import NotFound       from './pages/NotFound';
import ScrollToTop    from './components/ScrollToTop/ScrollToTop';
import AuthLayout     from './authenticated/AuthLayout';
import PracticeLayout from './authenticated/layouts/PracticeLayout';
import PracticePage   from './authenticated/pages/Practice/PracticePage';
import PlaceholderPage from './authenticated/pages/Placeholder/PlaceholderPage';
import TopicProblemListPage from './authenticated/pages/TopicProblemList/TopicProblemListPage';
import CompanyPage    from './authenticated/pages/Company/CompanyPage';
import SpecialProblemsPage from './authenticated/pages/SpecialProblems/SpecialProblemsPage';
import MachineLearningPage from './authenticated/pages/MachineLearning/MachineLearningPage';
import MachineLearningProjectPage from './authenticated/pages/MachineLearning/MachineLearningProjectPage';
import {
  SYSTEM_DESIGN_PROBLEMS, SYSTEM_DESIGN_HEADING,
  LLD_PROBLEMS, LLD_HEADING,
  DB_PROBLEMS, DB_HEADING,
} from './authenticated/data/specialPagesData';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ── Public pages ── */}
        <Route path="/"        element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms"   element={<Terms />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pro"     element={<ProPage />} />
        <Route path="/gift"    element={<GiftPage />} />

        {/* ── Authenticated: navbar + content ── */}
        <Route element={<AuthLayout />}>

          {/* All practice/courses pages share the 3-column PracticeLayout */}
          <Route element={<PracticeLayout />}>
            {/* Practice */}
            <Route path="/practice" element={<Navigate to="/practice/problems/neetcode150" replace />} />
            <Route path="/practice/problems/:listId"          element={<PracticePage />} />
            <Route path="/practice/company"                   element={<CompanyPage />} />
            <Route path="/practice/company/:companyName"       element={<CompanyPage />} />
            <Route path="/practice/cheatsheet"                element={<PlaceholderPage title="Cheatsheets" />} />
            <Route path="/practice/quizes"                    element={<PlaceholderPage title="Quizes" />} />
            <Route path="/practice/system-design"
              element={<SpecialProblemsPage title="System Design" heading={SYSTEM_DESIGN_HEADING} problems={SYSTEM_DESIGN_PROBLEMS} />} />
            <Route path="/practice/machine-learning"          element={<MachineLearningPage />} />
            <Route path="/practice/machine-learning/project"  element={<MachineLearningProjectPage />} />
            <Route path="/practice/low-level-design"
              element={<SpecialProblemsPage title="Low Level Design" heading={LLD_HEADING} problems={LLD_PROBLEMS} />} />
            <Route path="/practice/databases"
              element={<SpecialProblemsPage title="Databases" heading={DB_HEADING} problems={DB_PROBLEMS} />} />
            {/* Topic-specific problem list */}
            <Route path="/practice/problem-list/:topicId"     element={<TopicProblemListPage />} />

            {/* Courses */}
            <Route path="/courses/dsa"          element={<PlaceholderPage title="Data Structures & Algorithms" />} />
            <Route path="/courses/system-design" element={<PlaceholderPage title="System Design" />} />
            <Route path="/courses/python"        element={<PlaceholderPage title="Python" />} />
            <Route path="/courses/fullstack"     element={<PlaceholderPage title="Full Stack Development" />} />
            <Route path="/courses/ood"           element={<PlaceholderPage title="Object Oriented Design" />} />
          </Route>

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
