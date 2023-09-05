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
import { AccountCircleRounded } from "@mui/icons-material/";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

const Wrapper = styled.div`
  padding: 30px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  /* background-color: teal; */
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: aqua; */
`;

export default function Header() {
  const [userRole, setUserRole] = useState("admin");
  // const [userRole, setUserRole] = useState("user");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMenu, setCurrentMenu] = useState("");

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // 현재 클릭된 메뉴의 이름을 저장.
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

  const users = [
    { name: "내 계정", url: "/user/info", roles: ["user"] },
    { name: "사원 관리", url: "/admin/info", roles: ["admin"] },
    { name: "로그아웃", url: "/", roles: ["admin", "user"] },
  ];

  return (
    <Wrapper>
      <Logo>
        <Link href="/">
          <Image
            src="/redDice1Remove.png"
            alt="레드 다이스"
            width="40"
            height="40"
          />
        </Link>
        <Typography
          variant="h6"
          // noWrap
          component="a"
          href="/"
          sx={{
            // mr: 2,
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
      </Logo>

      {pages.map((page, idx) => (
        <>
          <Button
            sx={{
              // backgroundColor: "#abcdef", // 배경색
              color: "#123456", // 텍스트 색상
            }}
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
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push(cPage.url);
                  }}
                  key={`menu-item-${idx}-${cIdx}`}
                >
                  {cPage.name}
                </MenuItem>
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
        <Avatar sx={{ width: 32, height: 32 }}>
          <AccountCircleRounded />
        </Avatar>
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
        {users
          .filter((user) => user.roles.includes(userRole)) // 현재 로그인한 사용자의 역할과 일치하는 메뉴 항목만 필터링
          .map((user, idx) => (
            <MenuItem
              onClick={() => {
                handleClose();
                router.push(user.url);
              }}
              key={`user-menu-item-${idx}`}
            >
              {user.name}
            </MenuItem>
          ))}
      </Menu>
    </Wrapper>
  );
}
