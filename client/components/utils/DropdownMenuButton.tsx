import { Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { AccountCircleRounded } from "@mui/icons-material/";
import { MouseEvent } from "react";

interface MenuItem {
  name: string;
  url: string;
}

interface DropdownMenuButtonProps {
  buttonContent: string | JSX.Element;
  menuItems: MenuItem[];
  currentMenu: string;
  anchorEl: HTMLElement | null;
  handleClick(event: MouseEvent<HTMLElement>): void;
  handleClose(url?: string): void;
}

export default function DropdownMenuButton({
  buttonContent,
  menuItems,
  currentMenu,
  anchorEl,
  handleClick,
  handleClose,
}: DropdownMenuButtonProps) {
  const open = Boolean(anchorEl);
  const id = typeof buttonContent === "string" ? buttonContent : "account";

  return (
    <>
      {typeof buttonContent === "string" ? (
        <Button
          sx={{
            color: "#262626",
            fontSize: "20px",
            fontWeight: 700,
          }}
          aria-controls={open ? `${id}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {buttonContent}
        </Button>
      ) : (
        <IconButton onClick={(event) => handleClick(event)} size="small">
          <Avatar sx={{ width: 32, height: 32 }}>
            <AccountCircleRounded />
          </Avatar>
          //{" "}
        </IconButton>
      )}
      <div>
        <Menu
          id={`${id}-menu`}
          anchorEl={anchorEl}
          open={open && currentMenu === id}
          onClose={() => handleClose()}
        >
          {menuItems.map((item, idx) => (
            <div key={idx}>
              <MenuItem key={item.name} onClick={() => handleClose(item.url)}>
                {item.name}
              </MenuItem>
            </div>
          ))}
        </Menu>
      </div>
    </>
  );
}
