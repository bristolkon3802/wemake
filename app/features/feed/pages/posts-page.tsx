import type { Route } from "./+types/posts-page";
import { Link, Form } from "react-router";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Separator } from "~/common/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/common/components/ui/tooltip";
import {
  PlusIcon,
  HeartIcon,
  MessageCircleIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  LockIcon,
  KeyRoundIcon,
  UsersIcon,
  GlobeIcon,
  FileTextIcon,
} from "lucide-react";

type PostStatus = "published" | "draft";
type Visibility = "public" | "private" | "password" | "members";

interface Post {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  visibility: Visibility;
  category: string;
  thumbnail_url: string | null;
  like_count: number;
  comment_count: number;
  view_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export async function loader({ request }: Route.LoaderArgs) {
  // TODO: 사용자 인증 확인 및 실제 데이터베이스에서 해당 사용자의 게시글만 가져오기
  const myPosts: Post[] = [
    {
      id: "1",
      title: "반려동물 건강 관리 팁",
      content: "우리 반려동물의 건강을 위한 중요한 관리 방법들을 소개합니다...",
      status: "published",
      visibility: "public",
      category: "반려동물",
      thumbnail_url:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600",
      like_count: 25,
      comment_count: 8,
      view_count: 150,
      tags: ["반려동물", "건강", "팁"],
      created_at: "2024-03-15T10:00:00Z",
      updated_at: "2024-03-15T10:00:00Z",
    },
    {
      id: "2",
      title: "임시 저장된 게시글",
      content: "아직 작성 중인 게시글입니다...",
      status: "draft",
      visibility: "private",
      category: "커뮤니티",
      thumbnail_url: null,
      like_count: 0,
      comment_count: 0,
      view_count: 0,
      tags: ["임시저장"],
      created_at: "2024-03-16T09:00:00Z",
      updated_at: "2024-03-16T09:00:00Z",
    },
    {
      id: "3",
      title: "멤버 전용: 강아지 훈련 고급 기술",
      content: "회원에게만 공개되는 강아지 훈련의 고급 기술들을 소개합니다.",
      status: "published",
      visibility: "members",
      category: "반려동물",
      thumbnail_url:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600",
      like_count: 15,
      comment_count: 4,
      view_count: 80,
      tags: ["강아지", "훈련", "멤버전용"],
      created_at: "2024-03-18T14:00:00Z",
      updated_at: "2024-03-18T14:00:00Z",
    },
    {
      id: "4",
      title: "비밀번호로 보호된 글",
      content: "이 글은 비밀번호로 보호되어 있습니다...",
      status: "published",
      visibility: "password",
      category: "팁&노하우",
      thumbnail_url:
        "https://images.unsplash.com/photo-1598875704239-0118a87349de?q=80&w=600",
      like_count: 5,
      comment_count: 1,
      view_count: 30,
      tags: ["보안", "비밀"],
      created_at: "2024-03-17T11:00:00Z",
      updated_at: "2024-03-17T11:00:00Z",
    },
  ];

  return { myPosts };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete_post") {
    const postId = formData.get("postId") as string;
    // TODO: 실제 데이터베이스에서 게시글 삭제 로직 구현
    // const { userId } = await requireAuth(request);
    // await db.delete(posts).where(and(eq(posts.id, postId), eq(posts.user_id, userId)));
    console.log(`게시글 삭제 요청: ${postId}`);
    return { success: true };
  }

  return { success: false, message: "잘못된 요청입니다." };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "내 게시글 - wemake" },
    { name: "description", content: "내가 작성한 게시글들을 관리하세요." },
  ];
}

const VisibilityIcon = ({ visibility }: { visibility: Visibility }) => {
  const icons: Record<Visibility, React.ReactElement> = {
    public: <GlobeIcon className="w-4 h-4 text-green-500" />,
    private: <LockIcon className="w-4 h-4 text-red-500" />,
    members: <UsersIcon className="w-4 h-4 text-blue-500" />,
    password: <KeyRoundIcon className="w-4 h-4 text-orange-500" />,
  };
  const labels: Record<Visibility, string> = {
    public: "전체 공개",
    private: "비공개",
    members: "멤버 공개",
    password: "비밀번호 보호",
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center">{icons[visibility]}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{labels[visibility]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function MyPostsPage({ loaderData }: Route.ComponentProps) {
  const { myPosts } = loaderData;
  const [filter, setFilter] = useState<"all" | PostStatus>("all");

  const filteredPosts = myPosts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">내 게시글 관리</h1>
          <p className="text-muted-foreground mt-2">
            작성한 게시글들을 관리하고 통계를 확인하세요.
          </p>
        </div>
        <Button asChild>
          <Link to="/feed/add">
            <PlusIcon className="w-4 h-4 mr-2" />새 게시글 작성
          </Link>
        </Button>
      </div>

      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as any)}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">전체 ({myPosts.length})</TabsTrigger>
          <TabsTrigger value="published">
            공개됨 ({myPosts.filter((p) => p.status === "published").length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            임시저장 ({myPosts.filter((p) => p.status === "draft").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
              <div className="bg-muted flex items-center justify-center">
                {post.thumbnail_url ? (
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileTextIcon className="w-16 h-16 text-muted-foreground/50" />
                )}
              </div>
              <div className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <VisibilityIcon visibility={post.visibility} />
                        <Badge
                          variant={
                            post.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {post.status === "published" ? "공개" : "임시저장"}
                        </Badge>
                      </div>
                      <Link
                        to={`/feed/posts/${post.id}`}
                        className="hover:underline"
                      >
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/feed/posts/${post.id}/edit`}>
                          <EditIcon className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Form
                        method="post"
                        onSubmit={(e) => {
                          if (
                            !confirm(
                              `'${post.title}' 게시글을 정말로 삭제하시겠습니까?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input
                          type="hidden"
                          name="intent"
                          value="delete_post"
                        />
                        <input type="hidden" name="postId" value={post.id} />
                        <Button variant="destructive" size="icon" type="submit">
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </Form>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col justify-end">
                  <Separator className="mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        작성: {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.updated_at !== post.created_at && (
                        <span>
                          수정: {new Date(post.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        {post.view_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="w-4 h-4" />
                        {post.like_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircleIcon className="w-4 h-4" />
                        {post.comment_count}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <FileTextIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-4">
            {filter === "all"
              ? "아직 작성한 게시글이 없습니다."
              : "해당 상태의 게시글이 없습니다."}
          </p>
          <Button asChild>
            <Link to="/feed/create">첫 번째 게시글 작성하기</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
