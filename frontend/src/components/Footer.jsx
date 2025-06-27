const Footer = () => {
    return (
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t dark:border-gray-700 mt-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    Made with ❤️ by Mohit •{" "}
                    <a
                        href="https://github.com/mohitooo28/ShrinkR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500"
                    >
                        View on GitHub
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
