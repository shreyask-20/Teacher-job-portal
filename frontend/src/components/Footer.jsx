import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-500">
              JobGrids is your trusted platform for finding the perfect job match and advancing your career.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-500 hover:text-primary">Find Jobs</Link></li>
              <li><Link to="/companies" className="text-gray-500 hover:text-primary">Companies</Link></li>
              <li><Link to="/resources" className="text-gray-500 hover:text-primary">Resources</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><Link to="/post-job" className="text-gray-500 hover:text-primary">Post a Job</Link></li>
              <li><Link to="/pricing" className="text-gray-500 hover:text-primary">Pricing</Link></li>
              <li><Link to="/solutions" className="text-gray-500 hover:text-primary">Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-500 hover:text-primary">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 JobGrids. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;