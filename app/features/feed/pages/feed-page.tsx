import type { Route } from "./+types/feed-page";
import { Link, useFetcher, Form, useSearchParams } from "react-router";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { PlusIcon, HeartIcon, MessageCircleIcon, Loader2 } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import { Input } from "~/common/components/ui/input";
import {
  PostGrid,
  type Post,
  type PostAuthor,
} from "~/features/feed/components/post-card";

// Types
interface PostMedia {
  thumbnail: {
    url: string;
    alt: string;
  };
}

interface PostInfo {
  media: PostMedia;
}

interface LoaderData {
  posts: Post[];
  sort: string;
  page: number;
  total: number;
  q: string;
  category: string;
}

interface SampleData {
  readonly titles: readonly string[];
  readonly authors: readonly PostAuthor[];
  readonly tags: readonly (readonly string[])[];
  readonly images: readonly string[];
}

interface FilterParams {
  sort: string;
  q: string;
  category: string;
}

interface InfiniteScrollOptions {
  fetcher: ReturnType<typeof useFetcher>;
  sort: string;
  hasMorePosts: boolean;
  q: string;
  category: string;
}

// Constants
const PAGE_SIZE = 12;
const TOTAL_MOCK_POSTS = 100;
const INTERSECTION_THRESHOLD = 1.0;

const SAMPLE_DATA: SampleData = {
  titles: [
    "반려동물과 함께하는 건강한 여름나기",
    "초보 집사를 위한 고양이 용품 추천",
    "우리집 앵무새, 말을 가르치는 법",
    "수제 간식 레시피: 강아지용 고구마 스틱",
    "햄스터를 위한 안전한 쳇바퀴 고르기",
    "열대어 어항 꾸미기 A to Z",
    "고슴도치 목욕 시키는 방법",
    "파충류를 위한 최적의 테라리움 환경",
  ],
  authors: [
    {
      name: "김철수",
      username: "kimcs",
      avatar_url: "https://github.com/shadcn.png",
    },
    { name: "박영희", username: "parkyh", avatar_url: null },
    {
      name: "이민준",
      username: "lmj",
      avatar_url: "https://github.com/identicons/minjun.png",
    },
    {
      name: "최지아",
      username: "choija",
      avatar_url: "https://github.com/identicons/jia.png",
    },
  ],
  tags: [
    ["반려동물", "건강"],
    ["고양이", "용품"],
    ["앵무새", "훈련"],
    ["강아지", "레시피"],
    ["햄스터", "안전"],
    ["열대어", "어항"],
    ["고슴도치", "목욕"],
    ["파충류", "환경"],
  ],
  images: [
    "https://images.unsplash.com/photo-1596492784533-72295e833d9b?q=80&w=600",
    "https://images.unsplash.com/photo-1574158622682-e40e69841006?q=80&w=600",
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=600",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600",
    "https://images.unsplash.com/photo-1425082661705-1834bfd09d64?q=80&w=600",
    "https://images.unsplash.com/photo-1522069169874-c58ec4b76259?q=80&w=600",
    "https://images.unsplash.com/photo-1598428212954-3c65b5358163?q=80&w=600",
    "https://images.unsplash.com/photo-1563501902998-270886022637?q=80&w=600",
  ],
} as const;

const ANIMAL_CATEGORIES = Array.from(
  new Set(SAMPLE_DATA.tags.map((tagGroup) => tagGroup[0]))
);

const SORT_OPTIONS = {
  recent: "최신순",
  popular: "인기순",
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

// Helper functions
function generateMockPost(index: number): Post {
  const randomIndex = Math.floor(Math.random() * SAMPLE_DATA.titles.length);
  const date = new Date(Date.now() - index * 24 * 60 * 60 * 1000);
  const categoryAndTags = SAMPLE_DATA.tags[randomIndex];

  return {
    id: `${index}`,
    title: `${SAMPLE_DATA.titles[randomIndex]} #${index}`,
    author: SAMPLE_DATA.authors[index % SAMPLE_DATA.authors.length],
    like_count: Math.floor(Math.random() * 300),
    comment_count: Math.floor(Math.random() * 70),
    view_count: Math.floor(Math.random() * 5000),
    created_at: date.toISOString(),
    category: categoryAndTags[0],
    tags: [...categoryAndTags.slice(1)],
    post_info: {
      media: {
        thumbnail: {
          url: `${SAMPLE_DATA.images[randomIndex]}&seed=${index}`,
          alt: SAMPLE_DATA.titles[randomIndex],
        },
      },
    },
  };
}

function generateMockPosts(count: number): Post[] {
  return Array.from({ length: count }, (_, index) =>
    generateMockPost(index + 1)
  );
}

function getPaginatedPosts(posts: Post[], page: number): Post[] {
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return posts.slice(startIndex, endIndex);
}

function buildInfiniteScrollQuery(
  sort: string,
  page: number,
  q: string,
  category: string
): string {
  const params = new URLSearchParams();
  params.set("sort", sort);
  params.set("page", page.toString());
  if (q) params.set("q", q);
  if (category && category !== "all") params.set("category", category);
  params.set("index", "");
  return `?${params.toString()}`;
}

function applySearchFilter(posts: Post[], searchQuery: string): Post[] {
  if (!searchQuery) return posts;

  const lowercaseQuery = searchQuery.toLowerCase();
  return posts.filter((post) =>
    post.title.toLowerCase().includes(lowercaseQuery)
  );
}

function applyCategoryFilter(posts: Post[], category: string): Post[] {
  if (!category || category === "all") return posts;

  return posts.filter((post) => post.category === category);
}

function applySorting(posts: Post[], sortOption: string): Post[] {
  const sortedPosts = [...posts];

  if (sortOption === "popular") {
    return sortedPosts.sort((a, b) => b.like_count - a.like_count);
  }

  // Default to recent sorting
  return sortedPosts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

function processPostsData(
  posts: Post[],
  searchQuery: string,
  category: string,
  sortOption: string
): Post[] {
  let processedPosts = posts;

  processedPosts = applySearchFilter(processedPosts, searchQuery);
  processedPosts = applyCategoryFilter(processedPosts, category);
  processedPosts = applySorting(processedPosts, sortOption);

  return processedPosts;
}

// Mock data
const allMockPosts = generateMockPosts(TOTAL_MOCK_POSTS);

// Route handlers
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const sort = params.get("sort") || "recent";
  const page = parseInt(params.get("page") || "1", 10);
  const q = params.get("q") || "";
  const category = params.get("category") || "all";

  const filteredPosts = processPostsData(allMockPosts, q, category, sort);
  const posts = getPaginatedPosts(filteredPosts, page);

  return {
    posts,
    sort,
    page,
    total: filteredPosts.length,
    q,
    category,
  };
}

export async function action({ request }: Route.ActionArgs) {
  return { success: true };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "피드 - wemake" },
    { name: "description", content: "커뮤니티의 다양한 이야기를 만나보세요." },
  ];
}

// Components
function FeedHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">울 아이 자랑방</h1>
        <p className="text-muted-foreground mt-2">
          다양한 반려동물 이야기를 만나보세요.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Button asChild>
          <Link to="/feed/add">
            <PlusIcon className="w-4 h-4 mr-2" />새 글 작성
          </Link>
        </Button>
      </div>
    </div>
  );
}

function SortButtons({
  currentSort,
  searchParams,
}: {
  currentSort: string;
  searchParams: URLSearchParams;
}) {
  const getSortLink = useCallback(
    (sortValue: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort", sortValue);
      return `/feed?${newParams.toString()}`;
    },
    [searchParams]
  );

  return (
    <div className="flex gap-2">
      {Object.entries(SORT_OPTIONS).map(([key, label]) => (
        <Button
          key={key}
          variant={currentSort === key ? "default" : "outline"}
          asChild
        >
          <Link to={getSortLink(key)} prefetch="intent">
            {label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

function SearchAndFilterForm({ filterParams }: { filterParams: FilterParams }) {
  const { sort, q, category } = filterParams;

  return (
    <Form
      method="get"
      action="/feed"
      className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
    >
      <input type="hidden" name="sort" value={sort} />
      <Select name="category" defaultValue={category}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 카테고리</SelectItem>
          {ANIMAL_CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="제목으로 검색..."
          className="w-full sm:w-auto"
        />
        <Button type="submit">검색</Button>
      </div>
    </Form>
  );
}

function FilterBar({ filterParams }: { filterParams: FilterParams }) {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
      <SortButtons
        currentSort={filterParams.sort}
        searchParams={searchParams}
      />
      <SearchAndFilterForm filterParams={filterParams} />
    </div>
  );
}

function PostStats({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
        <HeartIcon className="h-3.5 w-3.5" />
        {post.like_count}
      </span>
      <span className="flex items-center gap-1">
        <MessageCircleIcon className="h-3.5 w-3.5" />
        {post.comment_count}
      </span>
    </div>
  );
}

function PostAuthorInfo({ author }: { author: PostAuthor }) {
  return (
    <Link
      to={`/profile/${author.username}`}
      className="flex items-center gap-2 hover:text-primary"
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={author.avatar_url ?? undefined} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>
      <span>{author.name}</span>
    </Link>
  );
}

function PostTags({ category, tags }: { category: string; tags: string[] }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="outline">{category}</Badge>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const postDetailLink = `/feed/${post.id}`;

  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg">
      <Link to={postDetailLink} className="block">
        <div className="relative overflow-hidden">
          <img
            src={post.post_info.media.thumbnail.url}
            alt={post.post_info.media.thumbnail.alt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="flex-1 p-4">
        <PostTags category={post.category} tags={post.tags} />
        <CardTitle className="text-lg font-semibold leading-snug">
          <Link to={postDetailLink} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <PostAuthorInfo author={post.author} />
          <PostStats post={post} />
        </div>
      </CardFooter>
    </Card>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-center text-muted-foreground">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <span>불러오는 중...</span>
    </div>
  );
}

function EndMessage() {
  return (
    <p className="text-sm text-muted-foreground">모든 게시글을 보셨습니다.</p>
  );
}

function InfiniteScrollSentinel({
  fetcher,
  hasMorePosts,
  postsCount,
}: {
  fetcher: ReturnType<typeof useFetcher>;
  hasMorePosts: boolean;
  postsCount: number;
}) {
  const isLoading = fetcher.state === "loading";
  const shouldShowEndMessage = !hasMorePosts && postsCount > 0;

  return (
    <div className="h-10 w-full flex justify-center items-center">
      {isLoading && <LoadingIndicator />}
      {shouldShowEndMessage && <EndMessage />}
    </div>
  );
}

function EmptyStateContent({ isFiltering }: { isFiltering: boolean }) {
  if (isFiltering) {
    return (
      <>
        <p className="text-muted-foreground mb-4">검색 결과가 없습니다.</p>
        <Button variant="outline" asChild>
          <Link to="/feed">필터 초기화</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-4">아직 게시글이 없습니다.</p>
      <Button asChild>
        <Link to="/feed/add">첫 번째 게시글 작성하기</Link>
      </Button>
    </>
  );
}

function EmptyState({ isFiltering }: { isFiltering: boolean }) {
  return (
    <div className="text-center py-16">
      <EmptyStateContent isFiltering={isFiltering} />
    </div>
  );
}

// Custom hooks
function useInfiniteScroll({
  fetcher,
  sort,
  hasMorePosts,
  q,
  category,
}: InfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries[0].isIntersecting;
      const isNotLoading = fetcher.state !== "loading";

      if (isIntersecting && hasMorePosts && isNotLoading) {
        currentPage.current += 1;
        const query = buildInfiniteScrollQuery(
          sort,
          currentPage.current,
          q,
          category
        );
        fetcher.load(query);
      }
    },
    [fetcher, hasMorePosts, sort, q, category]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: INTERSECTION_THRESHOLD,
    });

    observer.observe(sentinel);
    return () => observer.unobserve(sentinel);
  }, [handleIntersection]);

  // Reset page when filters change
  useEffect(() => {
    currentPage.current = 1;
  }, [sort, q, category]);

  return { sentinelRef };
}

// Main component
export default function FeedPage({ loaderData }: Route.ComponentProps) {
  const {
    posts: initialPosts,
    sort,
    total,
    q,
    category,
  } = loaderData as LoaderData;

  const fetcher = useFetcher<typeof loader>();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const hasMorePosts = posts.length < total;
  const isFiltering = Boolean(q || (category && category !== "all"));
  const shouldShowPosts = posts.length > 0;

  const filterParams: FilterParams = useMemo(
    () => ({ sort, q, category }),
    [sort, q, category]
  );

  const { sentinelRef } = useInfiniteScroll({
    fetcher,
    sort,
    hasMorePosts,
    q,
    category,
  });

  // Reset posts when filters change
  useEffect(() => {
    // If the fetcher has data, it means a navigation (or filter change) happened.
    // We compare the current filter params with what's coming from the fetcher.
    // This effect is tricky. It's meant to reset the posts list when a user
    // changes filters via the FilterBar, which triggers a full page navigation.
    // The `initialPosts` from `loaderData` will be the new, filtered list.
    // We reset the `posts` state to this new list.
    setPosts(initialPosts);
  }, [initialPosts]);

  // Append new posts from infinite scroll
  useEffect(() => {
    const fetchedData = fetcher.data;
    // We only want to append posts if it's an infinite scroll fetch,
    // not a filter-change navigation.
    // A fetcher.load call will have data but won't be a full navigation.
    // We check if the fetched posts are not the same as initialPosts
    // and that the fetcher is not idle (i.e., it has been used).
    if (
      fetcher.data &&
      fetcher.state === "idle" &&
      !isFiltering && // Simplified logic: don't append if filtering is on.
      initialPosts !== fetcher.data.posts
    ) {
      const newPosts = fetchedData?.posts ?? [];
      if (newPosts.length > 0) {
        // Prevent adding duplicate posts
        setPosts((previousPosts) => {
          const existingIds = new Set(previousPosts.map((p) => p.id));
          const uniqueNewPosts = newPosts.filter((p) => !existingIds.has(p.id));
          return [...previousPosts, ...uniqueNewPosts];
        });
      }
    }
  }, [fetcher.data, fetcher.state, initialPosts, isFiltering]);

  return (
    <div className="container mx-auto px-4 py-8">
      <FeedHeader />
      <FilterBar filterParams={filterParams} />

      {shouldShowPosts ? (
        <>
          <PostGrid posts={posts} />
          <div ref={sentinelRef}>
            <InfiniteScrollSentinel
              fetcher={fetcher}
              hasMorePosts={hasMorePosts}
              postsCount={posts.length}
            />
          </div>
        </>
      ) : (
        <EmptyState isFiltering={isFiltering} />
      )}
    </div>
  );
}
