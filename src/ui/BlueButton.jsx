function BlueButton({ children, width = "", onClick }) {
  return (
    <button
      type="submit"
      className={` ${width} px-6 py-3 bg-[#003a65] text-white font-semibold rounded-lg hover:bg-[#a32233] transition duration-300`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BlueButton;
