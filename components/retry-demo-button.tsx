"use client";
import { Button } from "@/components/ui/button";
export function RetryDemoButton({ href }: { href: string }) {
  return <Button type="button" onClick={() => window.location.assign(href)}>Повторить</Button>;
}
