export const DEPARTMENTS = ["구매", "제조", "생산기술", "생산관리", "품질관리"];
export const RANKS = ["사원", "주임", "대리", "과장", "차장", "부장"];
export const FACTORY = ["양주 1공장", "파주 2공장"];
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
  { name: "내 계정", url: "/user/info", roles: ["user"] },
  { name: "사원 관리", url: "/admin/info", roles: ["admin"] },
  { name: "로그아웃", url: "/", roles: ["admin", "user"] },
];

// // pages.js
// export function getPages() {
//   // Here you can replace the static data with a fetch request or other methods of retrieving data.
//   return [
//     // ... your page data ...
//   ];
// }

// // users.js
// export function getUsers() {
//   // Here you can replace the static data with a fetch request or other methods of retrieving data.
//   return [
//     // ... your user data ...
//   ];
// }
