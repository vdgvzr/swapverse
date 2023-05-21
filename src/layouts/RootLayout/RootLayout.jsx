import { Container, ThemeProvider } from "react-bootstrap";
import MainNav from "../../components/MainNav/MainNav";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <MainNav />
      <ThemeProvider breakpoints={["lg", "md", "sm", "xs"]}>
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export const rootRoute = {
  element: <RootLayout />,
};
