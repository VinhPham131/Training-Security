import { useNavigate } from 'react-router-dom'

export default function RulesPage() {
  const navigate = useNavigate()
  return (
    <section aria-label="Rules" className="">
      <div className="inline-flex items-center h-[38px] px-4 rounded-full bg-white/10 border border-white/15 font-black text-white/95 tracking-[0.6px] uppercase text-[13px] w-fit mb-16">
        LUẬT CHƠI
      </div>

      <div className="rounded-[22px] p-[18px] bg-[rgba(168,59,20,0.58)] border border-white/15 shadow-[0_18px_30px_rgba(0,0,0,0.25)] text-white/90">
        <p className="m-0 mb-3.5 leading-normal">
          Bạn là nhân viên an ninh của khách sạn. Nhiệm vụ của bạn là sử dụng tiếng Anh đúng ngữ cảnh để hỗ trợ khách
          nước ngoài trong các tình huống thực tế.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <h3 className="m-0 mb-1.5 text-[14px] uppercase tracking-[0.6px]">How to play</h3>
            <ul className="m-0 pl-[18px] text-white/85 text-[14px] leading-normal">
              <li>Chọn một chủ đề và bắt đầu câu hỏi.</li>
              <li>Trả lời đúng để đi tiếp (sai sẽ phải chơi lại).</li>
              <li>Một số câu “khẩn cấp” có đồng hồ đếm ngược.</li>
            </ul>
          </div>
          <div>
            <h3 className="m-0 mb-1.5 text-[14px] uppercase tracking-[0.6px]">Thời gian</h3>
            <ul className="m-0 pl-[18px] text-white/85 text-[14px] leading-normal">
              <li>Hệ thống xếp hạng dựa trên thời gian hoàn thành (càng nhanh càng tốt).</li>
              <li>Các câu “khẩn cấp” có giới hạn thời gian cho mỗi câu.</li>
            </ul>
          </div>
          <div>
            <h3 className="m-0 mb-1.5 text-[14px] uppercase tracking-[0.6px]">Badges</h3>
            <ul className="m-0 pl-[18px] text-white/85 text-[14px] leading-normal">
              <li>Mỗi lần hoàn thành, bạn sẽ nhận ngẫu nhiên 1 huy hiệu (không cần điều kiện).</li>
              <li>Nếu còn huy hiệu chưa mở, hệ thống sẽ ưu tiên tặng huy hiệu mới.</li>
            </ul>
          </div>
          <div>
            <h3 className="m-0 mb-1.5 text-[14px] uppercase tracking-[0.6px]">Leaderboard</h3>
            <ul className="m-0 pl-[18px] text-white/85 text-[14px] leading-normal">
              <li>BXH lưu LocalStorage (dữ liệu trên máy).</li>
              <li>Mỗi chủ đề sẽ lưu thời gian tốt nhất của bạn.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute left-[18px] bottom-4 inline-flex items-center gap-2.5 text-white/95" aria-label="Back navigation">
        <button
          type="button"
          className="w-[46px] h-[46px] rounded-[14px] bg-white/10 border border-white/20 grid place-items-center transition hover:-translate-y-px hover:bg-white/15"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15.5 19 8.5 12l7-7"
              stroke="rgba(255,255,255,.92)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="absolute right-[18px] bottom-4 inline-flex items-center gap-2.5 text-white/95" aria-label="Footer navigation">
        <button
          type="button"
          className="w-[46px] h-[46px] rounded-[14px] bg-white/10 border border-white/20 grid place-items-center transition hover:-translate-y-px hover:bg-white/15"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z"
              stroke="rgba(255,255,255,.92)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="font-extrabold tracking-[0.2px]">Home</span>
      </div>
    </section>
  )
}

