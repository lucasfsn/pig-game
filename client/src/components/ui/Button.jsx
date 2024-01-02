function Button({
  bgColor = 'bg-gray-600',
  textColor = 'text-white',
  children,
}) {
  return (
    <button
      type="submit"
      className={`font-semibold px-6 py-1.5 w-fit mx-auto rounded-full text-2xl hover:bg-gray-700 transition-all ${bgColor} ${textColor}`}
    >
      {children}
    </button>
  );
}

export default Button;
