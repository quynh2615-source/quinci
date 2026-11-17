import { ReviewPost, StudentUser } from '../types';

// ============================================================================
// [VỊ TRÍ ĐIỀN TEXT MARQUEE FOOTER - LỚP 0]
// Sinh viên chỉnh sửa các chuỗi thông tin liên hệ dưới đây để chạy ngang từ phải qua trái
// ============================================================================
export const FOOTER_MARQUEE_ITEMS: string[] = [
  'Liên hệ Ban Quản Trị Sinh Viên: univoice.sinhvien@university.edu.vn',
  'Văn phòng hỗ trợ sinh viên: Khu A, Phòng A204 — Đại học Bách Khoa & Công Nghệ',
  'Hotline góp ý nội dung: (028) 3864 7256 (Giờ hành chính Thứ 2 – Thứ 6)',
  'Đồ án Môn học Công nghệ Web — Thực hiện bởi Nhóm Sinh Viên UniVoice',
  'Chia sẻ khách quan · Tôn trọng giảng đường · Đồng hành cùng tân sinh viên',
];

// ============================================================================
// [VỊ TRÍ ĐIỀN THÔNG TIN ĐỒ ÁN & DANH SÁCH NHÓM - VIEW 5: ABOUT US]
// ============================================================================
export const PROJECT_META = {
  siteName: 'UniVoice',
  fullTitle: 'Cổng Thông Tin Ý Kiến Sinh Viên Về Môn Học & Giảng Viên',
  groupName: 'Nhóm Sinh Viên UniVoice — K22 Công Nghệ Thông Tin',
  projectName: 'Đồ án Xây dựng Cộng đồng Đánh giá Học phần & Giảng đường Minh bạch',
  contactEmail: 'univoice.sinhvien@university.edu.vn',
  campusAddress: 'Khu học xá Trung tâm, Tòa nhà A, Quận 10, TP. Hồ Chí Minh',
  overviewSummary:
    'UniVoice là nền tảng do sinh viên tự thiết kế và vận hành nhằm tổng hợp góc nhìn thực tế về phương pháp giảng dạy, đề cương học phần, cách tính điểm và tài liệu ôn tập. Mọi bài viết và bình luận đều hướng tới tinh thần xây dựng, giúp sinh viên khóa sau chủ động lập kế hoạch học tập hiệu quả trước mỗi kỳ đăng ký tín chỉ.',
};

export interface TeamMember {
  studentId: string;
  fullName: string;
  role: string;
  responsibility: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    studentId: '22110018',
    fullName: 'Nguyễn Hoàng Minh',
    role: 'Nhóm trưởng & Kiến trúc hệ thống',
    responsibility: 'Thiết kế luồng dữ liệu, tích hợp API và điều phối tiến độ đồ án',
  },
  {
    studentId: '22110042',
    fullName: 'Trần Thảo Vy',
    role: 'Thiết kế giao diện & Trải nghiệm',
    responsibility: 'Xây dựng Landing Page, hệ thống Tab và giao diện bài đăng',
  },
  {
    studentId: '22110075',
    fullName: 'Lê Quốc Bảo',
    role: 'Phát triển Frontend & Kiểm thử',
    responsibility: 'Bộ lọc giảng viên/môn học, tìm kiếm nhanh và xác thực MSSV',
  },
  {
    studentId: '22110103',
    fullName: 'Phạm Ngọc Anh',
    role: 'Nội dung & Quy chuẩn cộng đồng',
    responsibility: 'Soạn thảo Biên bản, Nội quy sử dụng web và kiểm duyệt dữ liệu mẫu',
  },
];

// ============================================================================
// DỮ LIỆU KHUNG TRÌNH CHIẾU TRANG CHỦ (VIEW 1)
// ============================================================================
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  targetTab: 'reviews' | 'rules' | 'auth';
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Góc nhìn chân thực trước mỗi kỳ đăng ký tín chỉ',
    subtitle: 'Tổng hợp nhận xét học phần',
    description:
      'Tra cứu nhanh đề cương môn học, tỷ trọng điểm quá trình – cuối kỳ và kinh nghiệm học tốt từ chính các anh chị khóa trên.',
    imageUrl: '/src/assets/images/campus_hero_backdrop_1794954460099.jpg',
    ctaLabel: 'Xem bài review',
    targetTab: 'reviews',
  },
  {
    id: 'slide-2',
    title: 'Hiểu rõ phong cách giảng dạy của từng Giảng viên',
    subtitle: 'Trao đổi văn minh & khách quan',
    description:
      'Lọc trực tiếp theo tên giảng viên hoặc môn học để tìm lớp phù hợp với nhịp độ tiếp thu và định hướng nghiên cứu của bạn.',
    imageUrl: '/src/assets/images/lecture_hall_slide_1794954459940.jpg',
    ctaLabel: 'Đăng nhập bằng MSSV',
    targetTab: 'auth',
  },
  {
    id: 'slide-3',
    title: 'Chia sẻ tài liệu, ghi chú bài giảng & đề ôn tập',
    subtitle: 'Cộng đồng sinh viên hỗ trợ lẫn nhau',
    description:
      'Đăng bài kèm ảnh chụp vở ghi, slide tóm tắt hoặc thảo luận trực tiếp dưới phần bình luận cùng hàng trăm sinh viên cùng khóa.',
    imageUrl: '/src/assets/images/library_study_slide_1794954460693.jpg',
    ctaLabel: 'Đọc nội quy cộng đồng',
    targetTab: 'rules',
  },
];

// ============================================================================
// DỮ LIỆU BIÊN BẢN & NỘI QUY (VIEW 2)
// ============================================================================
export const MEETING_MINUTES = {
  documentCode: 'BB-UV-2026/01',
  effectiveDate: '15/09/2026',
  title: 'Biên bản thống nhất vận hành Cổng Ý Kiến Sinh Viên UniVoice',
  summary:
    'Tại buổi họp khởi động đồ án môn học, tập thể nhóm sinh viên thực hiện đã thống nhất mục tiêu xây dựng một diễn đàn học thuật nội bộ lành mạnh, minh bạch và phi lợi nhuận. Toàn bộ ý kiến đóng góp trên hệ thống mang tính tham khảo cá nhân, nhằm giúp sinh viên cải thiện phương pháp học và phản hồi tích cực cho chất lượng giảng dạy.',
};

export interface RuleItem {
  number: string;
  title: string;
  detail: string;
}

export const COMMUNITY_RULES: RuleItem[] = [
  {
    number: '01',
    title: 'Xác thực bằng Mã số sinh viên (MSSV) khi tương tác',
    detail:
      'Khách vãng lai có thể đọc và tìm kiếm các bài đánh giá công khai. Tuy nhiên, để đăng bài review mới hoặc gửi bình luận, người dùng bắt buộc phải đăng ký và đăng nhập bằng MSSV hợp lệ để đảm bảo trách nhiệm phát ngôn.',
  },
  {
    number: '02',
    title: 'Ngôn từ tôn trọng, không công kích cá nhân',
    detail:
      'Mọi nhận xét về giảng viên phải tập trung vào chuyên môn: tốc độ giảng bài, giáo trình, cách chấm điểm, độ rõ ràng của đồ án và thái độ hỗ trợ giải đáp thắc mắc. Nghiêm cấm lời lẽ thô tục, bôi nhọ danh dự hoặc suy diễn đời tư.',
  },
  {
    number: '03',
    title: 'Đánh giá trung thực theo học kỳ đã tham gia',
    detail:
      'Sinh viên chỉ chia sẻ trải nghiệm từ những lớp học phần mình thực sự theo học. Khuyến khích nêu rõ học kỳ, tỷ lệ điểm danh, hình thức thi (trắc nghiệm, tự luận hay vấn đáp) để người đọc có cơ sở tham chiếu chính xác.',
  },
  {
    number: '04',
    title: 'Quy định về hình ảnh đính kèm trong bài viết và bình luận',
    detail:
      'Cho phép tải lên ảnh chụp vở ghi chép, đề cương môn học, lịch trình bài tập lớn hoặc ảnh lớp học góc rộng. Tuyệt đối không đăng ảnh chụp trộm cận mặt giảng viên/sinh viên khi chưa có sự đồng ý, không phát tán đề thi mật đang lưu hành nội bộ.',
  },
  {
    number: '05',
    title: 'Không spam, quảng cáo dịch vụ làm bài hộ',
    detail:
      'Hệ thống nghiêm cấm các bình luận chứa liên kết quảng cáo, mua bán tài khoản, nhận thi hộ hoặc làm thuê đồ án. Vi phạm sẽ bị khóa quyền đăng bài vĩnh viễn theo MSSV.',
  },
];

// ============================================================================
// TÀI KHOẢN SINH VIÊN MẪU & BÀI REVIEW MẪU (VIEW 3 & VIEW 4)
// ============================================================================
export const INITIAL_USERS: StudentUser[] = [
  {
    id: 'user-demo-1',
    fullName: 'Nguyễn Minh Khoa',
    email: 'khoa.nm22110001@university.edu.vn',
    studentId: '22110001',
    password: '123456',
    createdAt: '2026-09-18T08:30:00.000Z',
  },
  {
    id: 'user-demo-2',
    fullName: 'Lê Thanh Trúc',
    email: 'truc.lt22110025@university.edu.vn',
    studentId: '22110025',
    password: '123456',
    createdAt: '2026-09-20T14:15:00.000Z',
  },
];

export const INITIAL_POSTS: ReviewPost[] = [
  {
    id: 'post-1',
    category: 'course',
    targetName: 'Giải tích 2 (Calculus II)',
    courseCode: 'MT1005',
    department: 'Khoa Khoa học Ứng dụng',
    rating: 5,
    authorName: 'Lê Thanh Trúc',
    authorStudentId: '22110025',
    content:
      'Môn Giải tích 2 kỳ này có phần tích phân bội và chuỗi số khá nặng nếu bỏ buổi đầu. Mẹo qua môn điểm A của mình là chép đầy đủ ví dụ mẫu trên bảng và làm hết 3 đề mẫu trước khi thi giữa kỳ. Đính kèm ảnh vở ghi chương tích phân từng phần cho các bạn năm nhất tham khảo nhé!',
    imageUrl: '/src/assets/images/course_notes_review_1794954461291.jpg',
    likes: ['22110001', '22110042'],
    comments: [
      {
        id: 'cmt-101',
        authorName: 'Nguyễn Minh Khoa',
        authorStudentId: '22110001',
        content:
          'Vở ghi sạch đẹp quá bạn ơi! Phần đổi biến lượng giác mình cũng hay nhầm cận, lưu lại ôn cuối kỳ luôn.',
        createdAt: '2026-11-16T09:20:00.000Z',
      },
    ],
    createdAt: '2026-11-15T14:10:00.000Z',
  },
  {
    id: 'post-2',
    category: 'lecturer',
    targetName: 'TS. Nguyễn Minh Tuấn',
    courseCode: 'CO2003 — Cấu trúc dữ liệu & Giải thuật',
    department: 'Khoa Khoa học & Kỹ thuật Máy tính',
    rating: 5,
    authorName: 'Nguyễn Minh Khoa',
    authorStudentId: '22110001',
    content:
      'Thầy Tuấn giảng phần Cây AVL và Đồ thị cực kỳ dễ hiểu, luôn vẽ minh họa từng bước xoay cây trên bảng thay vì chỉ đọc slide. Bài tập lớn thầy chấm kỹ phần tối ưu bộ nhớ nhưng bù lại phản hồi rất chi tiết qua email nếu nhóm gửi câu hỏi sớm.',
    imageUrl: '/src/assets/images/lecture_hall_slide_1794954459940.jpg',
    likes: ['22110025', '22110018', '22110075'],
    comments: [
      {
        id: 'cmt-201',
        authorName: 'Trần Thảo Vy',
        authorStudentId: '22110042',
        content:
          'Xác nhận nhé, học lớp thầy Tuấn chịu khó lên bảng sửa bài tập sẽ được cộng điểm chuyên cần rất thoáng.',
        createdAt: '2026-11-16T18:45:00.000Z',
      },
    ],
    createdAt: '2026-11-14T10:30:00.000Z',
  },
  {
    id: 'post-3',
    category: 'lecturer',
    targetName: 'ThS. Trần Thu Hà',
    courseCode: 'IM1013 — Kinh tế học đại cương',
    department: 'Khoa Quản lý Công nghiệp',
    rating: 4,
    authorName: 'Phạm Ngọc Anh',
    authorStudentId: '22110103',
    content:
      'Cô Hà giảng nhẹ nhàng, thường lồng ghép tình huống thực tế ở các doanh nghiệp Việt Nam nên lớp không bị buồn ngủ. Lưu ý nhỏ là cô điểm danh bất ngờ đầu giờ khoảng 4 lần trong kỳ và có bài thuyết trình nhóm chiếm 25% tổng điểm.',
    likes: ['22110001'],
    comments: [],
    createdAt: '2026-11-12T16:05:00.000Z',
  },
  {
    id: 'post-4',
    category: 'course',
    targetName: 'Hệ cơ sở dữ liệu',
    courseCode: 'CO2013',
    department: 'Khoa Khoa học & Kỹ thuật Máy tính',
    rating: 4,
    authorName: 'Lê Quốc Bảo',
    authorStudentId: '22110075',
    content:
      'Môn này nửa đầu học mô hình ER và chuẩn hóa 1NF/2NF/3NF/BCNF khá dễ lấy điểm. Nửa sau viết truy vấn SQL phức tạp và Trigger/Stored Procedure cần thực hành nhiều trên phòng máy. Nên ngồi thư viện làm chung theo nhóm 3 người sẽ đỡ bị kẹt lỗi khóa ngoại.',
    imageUrl: '/src/assets/images/library_study_slide_1794954460693.jpg',
    likes: ['22110025', '22110103'],
    comments: [],
    createdAt: '2026-11-10T11:20:00.000Z',
  },
];
