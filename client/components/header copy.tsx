"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
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

export default function Header() {
  const [userRole, setUserRole] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMenu, setCurrentMenu] = useState("");

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // 현재 클릭된 메뉴의 이름을 저장합니다.
    setCurrentMenu(event.currentTarget.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    router.push("");
  };

  const pages = [
    {
      name: "공장 현황",
      children: [
        // { name: "양주 1 공장", url: "/factory/1", roles: ["admin", "user"] },
        // { name: "파주 2 공장", url: "/factory/2", roles: ["admin", "user"] },
        { name: "양주 1 공장", url: "/factory/1" },
        { name: "파주 2 공장", url: "/factory/2" },
      ],
    },
    {
      name: "대시보드",
      children: [
        // { name: "양주 1 공장", url: "/board/1", roles: ["admin", "user"] },
        // { name: "파주 2 공장", url: "/board/2", roles: ["admin", "user"] },
        { name: "양주 1 공장", url: "/board/1" },
        { name: "파주 2 공장", url: "/board/2" },
      ],
    },
  ];

  const users = [
    { name: "내 계정", url: "/user/info", roles: ["user"] },
    { name: "사원 관리", url: "/admin/info", roles: ["admin"] },
  ];

  return (
    <Wrapper>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
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

      {pages.map((page, idx) => (
        <>
          <Button
            id={page.name}
            aria-controls={
              open && currentMenu === page.name
                ? `${page.name}-menu`
                : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              open && currentMenu === page.name ? "true" : undefined
            }
            onClick={handleClick}
          >
            {page.name}
          </Button>
          <div>
            <Menu
              id={`${page.name}-menu`}
              anchorEl={anchorEl}
              open={open && currentMenu === page.name}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": page.name,
              }}
            >
              {page.children.map((cPage, cIdx) => (
                <>
                  {/* 각 MenuItem에 Link 컴포넌트를 추가하고 key prop을 부여 */}
                  <MenuItem
                    onClick={handleClose}
                    key={`menu-item-${idx}-${cIdx}`}
                  >
                    <Link href={cPage.url}>{cPage.name}</Link>
                  </MenuItem>
                </>
              ))}
            </Menu>
          </div>
        </>
      ))}
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setCurrentMenu("account");
        }}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={
          open && currentMenu === "account" ? "account-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={open && currentMenu === "account" ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>사람</Avatar>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open && currentMenu === "account"}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {users.map((user, idx) => (
          <MenuItem onClick={handleClose} key={`user-menu-item-${idx}`}>
            {user.name}
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
}
