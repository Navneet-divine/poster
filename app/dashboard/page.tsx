"use client";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import axios from "axios";
import Header from "@/components/Header";

export default function Dashboard() {
  async function logout() {
    await axios.get("/api/auth/logout");
    console.log("hello");
  }

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          className="max-md:hidden"
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div className="flex justify-between items-center h-full">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar className="max-md:hidden" p="md">
        Navbar
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="flex justify-center border border-red-500  h-full">hello</div>
      </AppShell.Main>
      <AppShell.Footer className="xs:hidden h-16">footer</AppShell.Footer>
    </AppShell>
  );
}
