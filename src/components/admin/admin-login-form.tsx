"use client";

import { useFormState, useFormStatus } from "react-dom";
import { adminLogin, type ActionState } from "@/actions/blog-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useFormState(adminLogin, {} as ActionState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="password">Admin password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <Submit />
    </form>
  );
}
