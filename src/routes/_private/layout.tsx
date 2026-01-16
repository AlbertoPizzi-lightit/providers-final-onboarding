import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getAuthStoreState } from "@/stores";
import { Header, Logo, Nav, ProfilePicture } from "./-components";

const PrivateLayout = () => {
  return (
    <div>
      <Header>
        <Nav>
          <Logo />
          <ProfilePicture />
        </Nav>
      </Header>
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ location }) => {
    const { token } = getAuthStoreState();

    if (!token) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: PrivateLayout,
});
