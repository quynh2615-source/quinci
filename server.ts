import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CẤU HÌNH GEMINI API PHÍA SERVER
// API_KEY được lấy an toàn từ biến môi trường process.env.GEMINI_API_KEY
// (Người dùng hoặc quản trị viên thiết lập trong .env hoặc Settings > Secrets)
// ============================================================================
const API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `Bạn là Trợ lý AI hướng dẫn sử dụng trang web "UniVoice — Ý Kiến Sinh Viên Về Môn Học & Giảng Viên".
Nhiệm vụ của bạn là trả lời ngắn gọn, thân thiện, rõ ràng bằng tiếng Việt để hướng dẫn sinh viên cách dùng các tính năng của website:
1. Trang chủ (Tab 1): Xem khung trình chiếu và thông tin tổng quan về mục đích hoạt động của trang web.
2. Biên bản & Nội quy (Tab 2): Đọc các quy định văn minh học đường, tôn trọng giảng viên, trung thực khi viết review và quy chuẩn hình ảnh đính kèm.
3. Đăng ký & Đăng nhập (Tab 3): Sinh viên tạo tài khoản bằng Họ và tên, Email, Mã số sinh viên (MSSV) và Mật khẩu; hoặc đăng nhập bằng MSSV và Mật khẩu. Tài khoản mẫu để dùng thử nhanh là MSSV: 22110001, Mật khẩu: 123456.
4. Bài review (Tab 4): Dùng nút lọc ở góc trên bên trái để lọc theo "Giảng viên" hoặc "Môn học". Sinh viên có thể đăng bài review giống Facebook kèm hình ảnh minh họa (tài liệu, đề cương, lớp học) và bình luận kèm ảnh. Lưu ý: Phải đăng nhập hoặc đăng ký ở Tab 3 mới có thể đăng bài và bình luận.
5. Thanh tìm kiếm ở header: Nhập tên giảng viên, tên môn học hoặc từ khóa bất kỳ để tìm nhanh nội dung trên web.
6. About us (Tab 5): Xem thông tin nhóm sinh viên thực hiện đồ án và email liên hệ.

Không bịa đặt thông tin không có trên web. Nếu được hỏi ngoài phạm vi sử dụng web, hãy khéo léo hướng dẫn lại các thao tác chính trên UniVoice.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  // Endpoint AI Chatbot hướng dẫn sử dụng website
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body as {
        message?: string;
        history?: Array<{ role: 'user' | 'assistant'; text: string }>;
      };

      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Vui lòng nhập nội dung câu hỏi.' });
        return;
      }

      if (!API_KEY) {
        res.status(503).json({
          error:
            'Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra mục Settings > Secrets hoặc file .env.',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const conversationContext =
        Array.isArray(history) && history.length > 0
          ? history
              .slice(-6)
              .map((item) =>
                `${item.role === 'user' ? 'Sinh viên' : 'Trợ lý'}: ${item.text}`,
              )
              .join('\n') + `\nSinh viên: ${message.trim()}`
          : message.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: conversationContext,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const reply = response.text?.trim();
      if (!reply) {
        res.status(502).json({
          error: 'Không nhận được phản hồi từ trợ lý AI. Vui lòng thử lại.',
        });
        return;
      }

      res.json({ reply });
    } catch (error) {
      console.error('Gemini API error:', error);
      const errMessage =
        error instanceof Error ? error.message : 'Lỗi kết nối Gemini API.';
      res.status(500).json({
        error: `Không thể kết nối trợ lý AI lúc này (${errMessage}).`,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UniVoice server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
