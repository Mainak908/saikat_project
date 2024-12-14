const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">News Portal</h2>
          <p className="text-sm">
            Your go-to platform for breaking news, insightful articles, and the
            latest trends from around the globe.
          </p>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">Email: info@newsportal.com</p>
          <p className="text-sm">Phone: +1 (234) 567-890</p>
          <p className="text-sm">Address: 123 Main Street, City, Country</p>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-xl hover:text-green-400 transition duration-300"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-xl hover:text-green-400 transition duration-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-xl hover:text-green-400 transition duration-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-xl hover:text-green-400 transition duration-300"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center border-t border-gray-700 mt-8 pt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} News Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
