import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import {
  HomeIcon,
  ClipboardListIcon,
  PencilAltIcon,
  FireIcon,
} from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const ref = React.useRef(null);

  function getPageIndex(route) {
    switch (route) {
      case "/":
        return 0;
      case "/todolist":
        return 1;
      case "/post":
        return 2;
      case "/ranking":
        return 3;
      default:
        return 0;
    }
  }

  React.useEffect(() => {
    console.log(value);
    ref.current.ownerDocument.body.scrollTop = 0;
  }, []);

  let location = useLocation();
  const value = getPageIndex(location.pathname)

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
        >
          <BottomNavigationAction
            component={Link}
            label="홈"
            icon={<HomeIcon />}
            to="/"
            sx={{ py: "10px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="할 일"
            to="/todolist"
            icon={<ClipboardListIcon />}
            sx={{ py: "10px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="게시물 작성"
            to="/post"
            icon={<PencilAltIcon />}
            sx={{ py: "10px" }}
          />
          <BottomNavigationAction
            component={Link}
            label="실시간 랭킹"
            to="/ranking"
            icon={<FireIcon />}
            sx={{ py: "10px" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default NavBar;
