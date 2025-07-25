import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/UserAtom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/Workout/WorkoutsPage';
import NutritionPage from './pages/Workout/NutritionPage';
import TrackingPage from './pages/Workout/TrackingPage';
import ShopPage from './pages/Shopping/ShopPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/OnBoaring/LoginPage';
import SignupPage from './pages/OnBoaring/signupPage';
import HomeDashboard from './pages/Dashboard/HomeDashboard';
import AnalyticsPage1 from './pages/Dashboard/AnalyticsPage';
import Calories from './pages/CaloriesPage';
import ProfilePage from './pages/OnBoaring/Profilepage1';
import Community from './pages/Community';
import PrivacyPolicy from './pages/Privacypolicy';
import TermsOfService from './pages/termsandconditions';
import HelpCenter from './pages/Helpcenter';
import ContactUs from './pages/Contactus';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/Shopping/CartPage';
import { ProductProvider } from './context/ProductContext';
import SignupGymPage from './pages/OnBoaring/SignupGymPage';
import ActivityPage from './pages/Dashboard/ActivityPage';
import AchievementsPage from './pages/Dashboard/AchievementsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import WomensHealthPage from './pages/Workout/WomensHealthPage';
import SettingsPagegym from './pages/gymOwner/Pages/Settings';
import Dashboardgym from './pages/gymOwner/Pages/Dashboard';
import Meals from './pages/gymOwner/Pages/Meals/List';
import Members from './pages/gymOwner/Pages/Users/List';
import Sidebar from './pages/gymOwner/components/Layout/Sidebar';
import Navbar from './pages/gymOwner/components/Layout/Navbar';
import GymOwnerProfile from './pages/gymOwner/Pages/ProfilePage';
import AddEditMeal from './pages/gymOwner/Pages/Meals/AddEdits';
import AddEditTrainer from './pages/gymOwner/Pages/Trainers/AddEdit';
import AddList from './pages/gymOwner/Pages/Users/AddList';
import EditList from './pages/gymOwner/Pages/Users/Edit';
import ViewList from './pages/gymOwner/Pages/Users/ViewUser';
import WorkoutsList from './pages/gymOwner/Pages/Workouts/List';
import AddWorkout from './pages/gymOwner/Pages/Workouts/AddWorkout';
import EditWorkout from './pages/gymOwner/Pages/Workouts/EditWorkout';
import ManageProducts from './pages/gymOwner/Pages/Shop/ManageProducts';
import GymListing from './pages/gymOwner/components/Gym/GymListing';
import EditTrainer from './pages/gymOwner/Pages/Trainers/EditTrainer';
import ViewTrainer from './pages/gymOwner/Pages/Trainers/ViewTrainner';
import TrainersList from './pages/gymOwner/Pages/Trainers/List';
import AddWorkoutPage from './pages/Workout/AddWorkoutPage';
import UserMeals from './pages/gymOwner/Pages/Users/Meals';
import MealForm from './pages/gymOwner/Pages/Users/MealForm';
import EditMeal from './pages/gymOwner/Pages/Users/EditMeal';
import GymDetail from './pages/GymFinder/GymDetail';
import GymList from './pages/GymFinder/GymList';
import Layout from './pages/gymOwner/components/Layout';

function AppContent() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();

  // Route classification
  const isAuthPage = ['/login', '/signup', '/signupgym', '/onboarding'].includes(location.pathname);
  const isDashboard = ['/dashboard', '/activity', '/achievements', '/settings', '/profile'].includes(location.pathname);
  const isGymRoute = location.pathname.startsWith('/gym');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isGymOwner = user && user.role === 'gym_owner';

  if (isGymRoute && (!user || !isGymOwner)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Regular Header (for non-gym routes) */}
      {user && !isAuthPage && !isGymRoute && <Header />}
      {!user && !isDashboard && !isGymRoute && <Header />}

      {(isGymRoute && isGymOwner) ? (
        <Layout>
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <Routes>
                <Route path="/gym/settings" element={<SettingsPagegym />} />
                <Route path="/gym/profile" element={<GymOwnerProfile />} />
                <Route path="/gym" element={<Dashboardgym />} />
                <Route path="/gym/meals" element={<Meals />} />
                <Route path="/gym/meals/add" element={<AddEditMeal />} />
                <Route path="/gym/meals/edit/:id" element={<AddEditMeal />} />
                <Route path="/gym/trainers" element={<TrainersList />} />
                <Route path="/gym/trainers/add" element={<AddEditTrainer />} />
                <Route path="/gym/trainers/edit/:id" element={<EditTrainer />} />
                <Route path="/gym/trainers/view/:id" element={<ViewTrainer />} />
                <Route path="/gym/members" element={<Members />} />
                <Route path="/gym/members/add" element={<AddList />} />
                <Route path="/gym/members/edit/:id" element={<EditList />} />
                <Route path="/gym/members/view/:id" element={<ViewList />} />
                <Route path="/gym/members/meals/:id" element={<UserMeals />} />
                <Route path="/gym/members/meals/:id/add" element={<MealForm />} />
                <Route path="/gym/members/meals/:id/edit/:mealId" element={<MealForm />} />
                <Route path='/gym/members/meals/:userId/edit/:mealId' element={<EditMeal />} />
                <Route path="/gyms/List" element={<GymListing />} />
                <Route path="/gym/workouts" element={<WorkoutsList />} />
                <Route path="/gym/workouts/add" element={<AddWorkout />} />
                <Route path="/gym/workouts/edit/:id" element={<EditWorkout />} />
                <Route path="/gym/shop/manage" element={<ManageProducts />} />
              </Routes>
            </main>
          </div>
        </Layout>
      ) : (
        <div className="flex-1">
          <Routes>
            {!user && <Route path="/login" element={<LoginPage />} />}
            {!user && <Route path="/signup" element={<SignupPage />} />}
            {!user && <Route path="/signupgym" element={<SignupGymPage />} />}

            {user && user?.role === "user" ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<HomeDashboard />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/women-health" element={<WomensHealthPage />} />
                <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
                <Route path="/workouts/Add" element={<AddWorkoutPage />} />
                <Route path="/Finder" element={<GymList />} />
                <Route path="/Finder/:id" element={<GymDetail />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/Calories" element={<Calories />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/community" element={<Community />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/analytic" element={<AnalyticsPage1 />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </>
            ) : user && user?.role === "gym_owner" ? (
              <>
                <Route path="/" element={<Navigate to="/gym" replace />} />
                <Route path="/gym/*" element={<Dashboardgym />} />
              </>
            ) : (
              <Route path="*" element={<LoginPage />} />
            )}

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/term" element={<TermsOfService />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      )}

      {/* Footer (for non-gym and non-admin routes) */}
      {!isDashboard && !isAuthPage && !isGymRoute && !isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;