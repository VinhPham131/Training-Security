import Button from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="h-full px-6 py-8">
      <div
        className="
          flex justify-start items-center
          gap-4
          p-8
          w-[1200px]
          min-h-[520px]
          bg-[url('/homepage.png')]
          bg-cover
          bg-center
          bg-no-repeat
          rounded-2xl
        "
      >
        <div className="grid gap-4">
          <span className="text-[70px] font-black tracking-[0.8px] text-white/95">
            TRÒ CHƠI ĐÓNG VAI
          </span>
          <span className="text-[70px] font-black tracking-[0.8px] text-white/95">
            AN NINH
          </span>
          <span className="text-[70px] font-black tracking-[0.8px] text-white/95">
            KHÁCH SẠN
          </span>
        </div>
      </div>
      <h1 className="text-[15px] text-amber-200/80 mt-4">
        🎯 Mục tiêu: Giao tiếp tiếng Anh với khách nước ngoài trong các tình
        huống thực tế tại khách sạn 5 sao.
      </h1>

      <div className="w-[200px] ml-auto mt-6">
        <Button
          variant="ghost"
          size="sm"
          className="h-14 rounded-[14px] text-[18px] tracking-[0.5px]"
          onClick={() => navigate("/menu-page")}
        >
          START NOW
        </Button>
      </div>
    </section>
  );
}
