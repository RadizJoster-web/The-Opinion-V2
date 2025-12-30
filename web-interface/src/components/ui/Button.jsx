export default function Button({
  text,
  icon: Icon,
  onClick,
  className = "px-6 py-3 bg-dark text-white",
}) {
  return (
    <button
      onClick={onClick}
      className={`font-bold text-xs uppercase rounded-xl tracking-widest flex items-center gap-2 hover:bg-black transition-all ${className} duration-300`}
    >
      {/* Jika Icon ada, render komponennya */}
      {Icon && <Icon className="text-lg" />}
      {text}
    </button>
  );
}
