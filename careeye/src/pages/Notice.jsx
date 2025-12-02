import React, { useState } from "react";
import "../styles/Notice.css";

const Notice = () => {
  const [expandedId, setExpandedId] = useState(null);

  // 샘플 공지사항 데이터
  const notices = [
    {
      id: 1,
      category: "긴급",
      title: "시스템 정기 점검 안내",
      date: "2024-12-20",
      author: "관리자",
      content: `안녕하세요, Care EYE 운영팀입니다.

더 나은 서비스 제공을 위해 아래와 같이 시스템 정기 점검을 실시합니다.

📅 점검 일시: 2024년 12월 22일 (일) 02:00 ~ 06:00 (4시간)
🔧 점검 내용: 서버 안정화 및 보안 업데이트

점검 시간 동안에는 서비스 이용이 제한되오니 양해 부탁드립니다.
불편을 드려 죄송합니다.`
    },
    {
      id: 2,
      category: "업데이트",
      title: "v2.5.0 업데이트 안내 - 새로운 모니터링 기능 추가",
      date: "2024-12-18",
      author: "개발팀",
      content: `Care EYE v2.5.0 버전이 출시되었습니다! 🎉

주요 업데이트 내용:
- 실시간 모니터링 대시보드 개선
- AI 기반 이상 행동 감지 정확도 향상 (95% → 98%)
- 시니어별 맞춤 알림 설정 기능 추가
- 리포트 내보내기 기능 (PDF, Excel)
- 다크 모드 지원

업데이트 후 문의사항이 있으시면 고객센터로 연락 부탁드립니다.`
    },
    {
      id: 3,
      category: "안내",
      title: "겨울철 시니어 케어 가이드라인 안내",
      date: "2024-12-15",
      author: "의료팀",
      content: `겨울철 시니어 케어 시 주의사항을 안내드립니다.

🌡️ 실내 온도 관리
- 적정 실내 온도: 20-22°C 유지
- 습도: 50-60% 권장

🚶 낙상 예방
- 미끄러운 바닥 주의
- 적절한 실내 조명 확보
- 보행 보조기구 점검

💊 건강 관리
- 정기적인 혈압 체크
- 충분한 수분 섭취
- 독감 예방접종 권장

문의사항은 담당 케어매니저에게 연락해주세요.`
    },
    {
      id: 4,
      category: "이벤트",
      title: "연말 감사 이벤트 - 무료 건강검진 제공",
      date: "2024-12-10",
      author: "마케팅팀",
      content: `2024년 한 해 동안 Care EYE를 이용해주신 모든 분들께 감사드립니다! 💝

🎁 연말 감사 이벤트
- 대상: 등록된 모든 시니어
- 혜택: 무료 기초 건강검진 (혈압, 혈당, 체성분)
- 기간: 2024.12.15 ~ 2024.12.31
- 신청: 담당 요양시설에 문의

많은 참여 부탁드립니다!`
    },
    {
      id: 5,
      category: "안내",
      title: "개인정보처리방침 개정 안내",
      date: "2024-12-05",
      author: "법무팀",
      content: `개인정보처리방침이 아래와 같이 개정되어 안내드립니다.

📋 주요 개정 사항
- 개인정보 보유기간 명확화
- 제3자 제공 동의 절차 강화
- 개인정보 파기 절차 상세화

📅 시행일: 2025년 1월 1일

개정된 전문은 설정 > 개인정보처리방침에서 확인하실 수 있습니다.
문의사항은 privacy@careeye.com으로 연락 부탁드립니다.`
    },
    {
      id: 6,
      category: "업데이트",
      title: "모바일 앱 출시 안내",
      date: "2024-12-01",
      author: "개발팀",
      content: `드디어 Care EYE 모바일 앱이 출시되었습니다! 📱

🍎 iOS: App Store에서 'Care EYE' 검색
🤖 Android: Google Play에서 'Care EYE' 검색

주요 기능:
- 실시간 시니어 상태 확인
- 푸시 알림 수신
- 긴급 연락 원터치 기능
- 일일 리포트 확인

지금 바로 다운로드 받아보세요!`
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case "긴급":
        return "category-urgent";
      case "업데이트":
        return "category-update";
      case "이벤트":
        return "category-event";
      default:
        return "category-info";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "긴급":
        return "🚨";
      case "업데이트":
        return "🚀";
      case "이벤트":
        return "🎉";
      default:
        return "📢";
    }
  };

  return (
    <div className="notice-container">
      <div className="notice-content">
        {/* 헤더 */}
        <div className="notice-header">
          <div className="header-icon">📋</div>
          <h1>공지사항</h1>
          <p>Care EYE의 새로운 소식과 중요한 안내사항을 확인하세요</p>
        </div>

        {/* 공지사항 리스트 */}
        <div className="notice-list">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`notice-item ${expandedId === notice.id ? "expanded" : ""}`}
            >
              <div className="notice-item-header" onClick={() => toggleExpand(notice.id)}>
                <div className="notice-item-left">
                  <span className={`notice-category ${getCategoryStyle(notice.category)}`}>
                    {getCategoryIcon(notice.category)} {notice.category}
                  </span>
                  <h3 className="notice-title">{notice.title}</h3>
                </div>
                <div className="notice-item-right">
                  <span className="notice-date">📅 {notice.date}</span>
                  <span className="notice-author">✍️ {notice.author}</span>
                  <span className={`expand-icon ${expandedId === notice.id ? "rotated" : ""}`}>
                    ▼
                  </span>
                </div>
              </div>

              {expandedId === notice.id && (
                <div className="notice-item-content">
                  <pre>{notice.content}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 안내 문구 */}
        <div className="notice-footer">
          <p>💡 공지사항에 대한 문의는 고객센터(1588-0000)로 연락해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Notice;