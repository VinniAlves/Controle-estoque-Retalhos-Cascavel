import { Calendar,  Inbox, Search, Settings,CarFront,Cog } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Cadastro Estoque",
    url: "/CadastroEstoque",
    icon: CarFront,
  },
  {
    title: "Cadastro Peças",
    url: "/CadastroPecas",
    icon: Cog,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-red-500">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="text-white">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
