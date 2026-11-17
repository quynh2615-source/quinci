import { useEffect, useState } from 'react';
import {
  INITIAL_POSTS,
  INITIAL_USERS,
} from './data/mockData';
import {
  ReviewCategory,
  ReviewPost,
  StudentUser,
  TabId,
} from './types';
import { LandingLayer } from './components/LandingLayer';
import { TopNavHeader } from './components/TopNavHeader';
import { HomeView } from './components/views/HomeView';
import { RulesView } from './components/views/RulesView';
import { AuthView } from './components/views/AuthView';
import { ReviewsView } from './components/views/ReviewsView';
import { AboutView } from './components/views/AboutView';
import { ChatbotWidget } from './components/ChatbotWidget';

const STORAGE_KEYS = {
  users: 'univoice_users_v1',
  currentUser: 'univoice_current_user_v1',
  posts: 'univoice_posts_v1',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  // LỚP 0 vs LỚP 1 transition state
  const [showLanding, setShowLanding] = useState(true);

  // Active Tab trong Lớp 1
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Từ khóa tìm kiếm nhanh trên Top Header
  const [searchQuery, setSearchQuery] = useState('');

  // Thông báo khi người dùng chưa đăng nhập bị chuyển từ View 4 về View 3
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Dữ liệu người dùng & bài review lưu bền vững trên trình duyệt
  const [users, setUsers] = useState<StudentUser[]>(() =>
    loadFromStorage<StudentUser[]>(STORAGE_KEYS.users, INITIAL_USERS),
  );
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() =>
    loadFromStorage<StudentUser | null>(STORAGE_KEYS.currentUser, null),
  );
  const [posts, setPosts] = useState<ReviewPost[]>(() =>
    loadFromStorage<ReviewPost[]>(STORAGE_KEYS.posts, INITIAL_POSTS),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    } catch {
      // Ignore storage quota errors silently
    }
  }, [users]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(currentUser),
      );
    } catch {
      // Ignore storage errors
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
    } catch {
      // Ignore storage quota errors
    }
  }, [posts]);

  const handleRegister = (payload: {
    fullName: string;
    email: string;
    studentId: string;
    password: string;
  }) => {
    const fullName = payload.fullName.trim();
    const email = payload.email.trim().toLowerCase();
    const studentId = payload.studentId.trim();
    const password = payload.password;

    if (!fullName || !email || !studentId || password.length < 6) {
      return {
        ok: false,
        message: 'Vui lòng điền đầy đủ thông tin và mật khẩu tối thiểu 6 ký tự.',
      };
    }

    const exists = users.some(
      (u) =>
        u.studentId.toLowerCase() === studentId.toLowerCase() ||
        u.email.toLowerCase() === email,
    );

    if (exists) {
      return {
        ok: false,
        message: 'Mã số sinh viên hoặc Email này đã được đăng ký trước đó.',
      };
    }

    const newUser: StudentUser = {
      id: `user-${Date.now()}`,
      fullName,
      email,
      studentId,
      password,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return {
      ok: true,
      message: `Đăng ký thành công! Xin chào ${newUser.fullName}.`,
    };
  };

  const handleLogin = (payload: { studentId: string; password: string }) => {
    const studentId = payload.studentId.trim();
    const matched = users.find(
      (u) =>
        u.studentId.toLowerCase() === studentId.toLowerCase() &&
        u.password === payload.password,
    );

    if (!matched) {
      return {
        ok: false,
        message: 'Mã số sinh viên hoặc mật khẩu không chính xác.',
      };
    }

    setCurrentUser(matched);
    return {
      ok: true,
      message: `Đăng nhập thành công! Chào mừng ${matched.fullName}.`,
    };
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRequireAuth = (notice: string) => {
    setAuthNotice(notice);
    setActiveTab('auth');
  };

  const handleCreatePost = (payload: {
    category: ReviewCategory;
    targetName: string;
    courseCode: string;
    department: string;
    rating: number;
    content: string;
    imageUrl?: string;
  }) => {
    if (!currentUser) return;

    const newPost: ReviewPost = {
      id: `post-${Date.now()}`,
      category: payload.category,
      targetName: payload.targetName,
      courseCode: payload.courseCode || undefined,
      department: payload.department,
      rating: payload.rating,
      authorName: currentUser.fullName,
      authorStudentId: currentUser.studentId,
      content: payload.content,
      imageUrl: payload.imageUrl,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleToggleLike = (postId: string) => {
    if (!currentUser) return;
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const alreadyLiked = post.likes.includes(currentUser.studentId);
        return {
          ...post,
          likes: alreadyLiked
            ? post.likes.filter((id) => id !== currentUser.studentId)
            : [...post.likes, currentUser.studentId],
        };
      }),
    );
  };

  const handleAddComment = (
    postId: string,
    payload: { content: string; imageUrl?: string },
  ) => {
    if (!currentUser) return;
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `cmt-${Date.now()}`,
              authorName: currentUser.fullName,
              authorStudentId: currentUser.studentId,
              content: payload.content,
              imageUrl: payload.imageUrl,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }),
    );
  };

  const handleNavigateToSearchReview = (query: string) => {
    setSearchQuery(query);
    setActiveTab('reviews');
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* LỚP 0: CINEMATIC LANDING PAGE */}
      <LandingLayer
        isVisible={showLanding}
        onEnterDashboard={() => setShowLanding(false)}
      />

      {/* LỚP 1: MAIN APPLICATION DASHBOARD (Fixed Viewport / Tab Switching) */}
      <div
        aria-hidden={showLanding}
        className={`h-full w-full flex flex-col transition-opacity duration-500 ${
          showLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* FIXED TOP HEADER NAVIGATION BAR */}
        <TopNavHeader
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigateToSearchReview={handleNavigateToSearchReview}
          currentUser={currentUser}
          posts={posts}
          onBackToLanding={() => setShowLanding(true)}
        />

        {/* MAIN DYNAMIC VIEW AREA (Không reload, cuộn nội dung độc lập) */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeView
              posts={posts}
              usersCount={users.length}
              currentUser={currentUser}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'rules' && (
            <RulesView onNavigateTab={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'auth' && (
            <AuthView
              currentUser={currentUser}
              authNotice={authNotice}
              onClearAuthNotice={() => setAuthNotice(null)}
              onRegister={handleRegister}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'reviews' && (
            <ReviewsView
              posts={posts}
              currentUser={currentUser}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onRequireAuth={handleRequireAuth}
              onCreatePost={handleCreatePost}
              onToggleLike={handleToggleLike}
              onAddComment={handleAddComment}
            />
          )}

          {activeTab === 'about' && <AboutView />}
        </main>

        {/* BOTTOM-RIGHT FLOATING ACTION BUTTON & AI CHATBOT WIDGET */}
        <ChatbotWidget />
      </div>
    </div>
  );
}
