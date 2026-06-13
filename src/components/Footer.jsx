const Footer = () => {
    return (
        <footer className="flex items-center border-t border-gray-200 h-15 bg-blue-200">
            <div className="mx-auto text-center text-sm text-gray-500">
                تمامی حقوق محفوظ است © {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
