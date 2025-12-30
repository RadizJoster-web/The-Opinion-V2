import social_media from "@/assets/social_media";

export default function Social_media({ isMobile = false }) {
  return (
    <div className={isMobile ? "flex flex-col gap-3" : "hidden lg:flex gap-3"}>
      {social_media.map((item, index) => {
        // Ambil warna hover secara dinamis untuk Tooltip
        const hoverBgColor =
          item.hoverClass
            ?.split(" ")
            .find((cls) => cls.startsWith("hover:bg-"))
            ?.replace("hover:", "") || "bg-black";

        return (
          <a
            key={index}
            href={item.link}
            target={item.target || "_self"}
            className={`
              group relative flex items-center transition-all duration-300 bg-white
              ${
                isMobile
                  ? "w-full h-12 px-4 rounded-xl shadow-sm border border-black/5 justify-start gap-4"
                  : "w-10 h-10 rounded-full shadow-lg justify-center hover:-translate-y-1"
              }
              ${item.hoverClass}
            `}
          >
            {/* Icon - Tetap hitam, berubah saat hover lewat parent group */}
            <item.icon className="text-xl relative z-10 transition-colors duration-300 text-black group-hover:text-white" />

            {/* Nama di Mobile - Muncul di samping ikon */}
            {isMobile && (
              <span className="text-sm font-bold tracking-tight text-black duration-300 group-hover:text-white">
                {item.name}
              </span>
            )}

            {/* Tooltip di Desktop - Muncul di bawah */}
            {!isMobile && (
              <span
                className={`
                  absolute -bottom-10 opacity-0 scale-50 transition-all duration-300
                  text-[10px] font-black px-2 py-1 rounded text-white bg-black whitespace-nowrap
                  pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:-bottom-12
                  ${hoverBgColor}
                `}
              >
                {item.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
