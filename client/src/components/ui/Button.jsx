function Button({
  disabled,
  bgColor = 'bg-gray-600',
  textColor = 'text-white',
  textSize = 'text-2xl lg:text-3xl',
  onClick = () => {},
  children,
}) {
  return (
    <button
      type="submit"
      className={`font-semibold px-6 py-1.5 w-fit mx-auto rounded-full hover:bg-opacity-80 transition-all disabled:cursor-not-allowed ${bgColor} ${textColor} ${textSize}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
