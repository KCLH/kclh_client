"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// import { Box, Menu, MenuItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";

const Wrapper = styled.div`
  padding: 30px 30px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: teal;
`;

const pages = [
  {
    name: "공장 현황",
    children: [
      { name: "양주 1 공장", url: "/factory1", roles: ["admin", "user"] },
      { name: "파주 2 공장", url: "/factory2", roles: ["admin", "user"] },
    ],
  },
  {
    name: "대시보드",
    children: [
      { name: "양주 1 공장", url: "/board1", roles: ["admin", "user"] },
      { name: "파주 2 공장", url: "/board2", roles: ["admin", "user"] },
    ],
  },
];

const users = [
  { name: "내 계정", url: "/user/info", roles: ["user"] },
  { name: "사원 관리", url: "/admin/info", roles: ["admin"] },
];

export default function Header() {
  const [userRole, setUserRole] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      {/* <div>
        <Link href="/"></Link>
        <Link href="/"></Link>
      </div> */}
      {/* <Typography
        variant="h6"
        noWrap
        component="a"
        href="/login"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        RED DICE
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>

      </Box> */}
      <Link href={"/factory/1"}>양주 1 공장</Link>
      <Link href={"/factory/2"}>파주 2 공장</Link>
      {/* <MenuItem onClick={handleCloseMenu}>Menu Item 1</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Menu Item 2</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Menu Item 3</MenuItem> */}
    </Wrapper>
  );
}
