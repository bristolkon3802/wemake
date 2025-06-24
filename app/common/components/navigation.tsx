import { Link } from "react-router";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const menus = [
  {
    name: "반려동물 관리",
    to: "/pets",
    items: [
      {
        name: "반려동물 목록",
        description: "소중한 반려동물들의 건강과 가족 관계를 한눈에 확인하세요",
        to: "/pets",
      },
      {
        name: "건강 기록",
        description: "반려동물의 건강 기록을 관리하세요.",
        to: "/pets/health-records",
      },
      {
        name: "출산 기록",
        description: "반려동물의 출산 기록을 관리하세요.",
        to: "/pets/birth-records",
      },
      {
        name: "반려동물 등록",
        description: "새로운 반려동물을 등록하세요.",
        to: "/pets/register",
      },
      {
        name: "동물병원 찾기",
        description: "주변의 동물병원을 찾아보세요.",
        to: "/pets/hospitals",
      },
    ],
  },
  {
    name: "반려동물 갤러리",
    to: "/feed",
    items: [
      {
        name: "게시글 목록",
        description: "모든 게시글을 확인하세요.",
        to: "/feed",
      },
      {
        name: "내 게시글",
        description: "내가 작성한 게시글을 확인하세요.",
        to: "/feed/posts",
      },
      {
        name: "liked-posts",
        description: "좋아요한 게시글을 확인하세요.",
        to: "/feed/liked",
      },
      {
        name: "게시글 작성",
        description: "반려동물을 자랑해주세요.",
        to: "/feed/add",
      },
    ],
  },
  {
    name: "반려견 미용",
    to: "/grooming/pets",
    items: [
      {
        name: "내 반려견 관리",
        description: "미용 서비스를 이용할 반려견을 등록하고 관리하세요.",
        to: "/grooming/pets",
      },
      {
        name: "예약 내역",
        description: "미용 예약 내역을 확인하고 관리하세요.",
        to: "/grooming/appointments",
      },
      {
        name: "미용 예약하기",
        description: "등록된 반려견의 미용을 예약하세요.",
        to: "/grooming/appointments/add",
      },
    ],
  },
  {
    name: "자유 게시판",
    to: "#",
  },
  {
    name: "정보공유 게시판",
    to: "#",
  },
  {
    name: "Q&A 게시판",
    to: "#",
  },
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "커뮤니티의 최고 성과를 확인하세요.",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "카테고리별 제품을 확인하세요.",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "제품을 검색하세요.",
        to: "/products/search",
      },
      {
        name: "Submit a Product",
        description: "커뮤니티에 제품을 제출하세요.",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "커뮤니티에 제품을 홍보하세요.",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "커뮤니티에서 직업을 찾으십시오.",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-Time Jobs",
        description: "커뮤니티에서 정규직을 찾으십시오.",
        to: "/jobs?type=full-time",
      },
      {
        name: "Freelance Jobs",
        description: "커뮤니티에서 프리랜서를 찾으십시오.",
        to: "/jobs?type=freelance",
      },
      {
        name: "Internships",
        description: "커뮤니티에서 인턴을 찾으십시오.",
        to: "/jobs?type=internship",
      },
      {
        name: "Submit a Job",
        description: "커뮤니티에 일자리를 제출하세요.",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "커뮤니티에서 모든 게시물을 찾으십시오.",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "커뮤니티에서 인기 게시물을 찾으십시오.",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "커뮤니티에서 최신 게시물을 찾으십시오.",
        to: "/community?sort=new",
      },
      {
        name: "Create a Post",
        description: "커뮤니티에 게시물을 작성하세요.",
        to: "/community/submit",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "커뮤니티에서 모든 팀을 찾으십시오.",
        to: "/teams",
      },
      {
        name: "Create a Team",
        description: "커뮤니티에 팀을 생성하세요.",
        to: "/teams/create",
      },
    ],
  },
];

export default function Navigation({
  isLogging,
  hasNotifications,
  hasMessages,
  username,
  name,
  avatar,
}: {
  isLogging: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  username?: string;
  name?: string;
  avatar?: string | null;
}) {
  const isAdmin = true;
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          wemake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[550px] font-light gap-3 p-4 grid-cols-2">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn([
                              "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                              (item.to === "/products/promote" ||
                                item.to === "/jobs/submit") &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                            ])}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className="p-3 space-x-1 block leading-none no-underline outline-none"
                                to={item.to}
                              >
                                <span className="text-sm font-medium leading-none">
                                  {item.name}
                                </span>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
            {isAdmin && (
              <NavigationMenuItem>
                <Link to="/family" className={navigationMenuTriggerStyle()}>
                  가족 게시판
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLogging ? (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                {avatar ? (
                  <AvatarImage src={avatar} />
                ) : (
                  <AvatarFallback>{name?.[0]}</AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">
                  @{username}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="size-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
