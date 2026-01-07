import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "./-components";

const LoginPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-background-default-default to-background-default-secondary">
      <div className="w-96 rounded-2xl border border-background-default-tertiary bg-background-default-default p-5">
        <LoginForm />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/login/")({ component: LoginPage });
