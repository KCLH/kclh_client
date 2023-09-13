export const USERS_TABLE = [
  "사원번호",
  "이름",
  "부서",
  "직급",
  "공장",
  "전화번호",
  "이메일",
  "권한",
];

export const DEPARTMENTS = ["구매", "제조", "생산기술", "생산관리", "품질관리"];

export const RANKS = ["사원", "주임", "대리", "과장", "차장", "부장"];

export const FACTORY = ["전체", "양주 1공장", "파주 2공장"];

export const ROLES = ["사원", "관리자"];

export const PAGES = [
  {
    name: "공장 현황",
    children: [
      { name: "양주 1 공장", url: "/factory/1" },
      { name: "파주 2 공장", url: "/factory/2" },
    ],
  },
  {
    name: "대시보드",
    children: [
      { name: "양주 1 공장", url: "/board/1" },
      { name: "파주 2 공장", url: "/board/2" },
    ],
  },
];

export const USERS = [
  { name: "내 계정", url: "/user/myaccount", roles: ["사원"] },
  { name: "사원 관리", url: "/admin/accounts", roles: ["관리자"] },
];

export const CAROUSEL_IMG = [
  {
    src: "/boardGame.jpg",
    alt: "보드게임 제품 이미지",
  },
  {
    src: "/factory_in.jpg",
    alt: "공장 내부 이미지",
  },
  {
    src: "/factory_out.jpg",
    alt: "공장 외부 이미지",
  },
];
