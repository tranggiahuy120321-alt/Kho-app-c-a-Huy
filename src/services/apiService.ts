import { DailyFortune, AstrologyResult, UserProfile, ScanningResult } from '../models/types';
import { format } from 'date-fns';

class APIService {
  private static instance: APIService;

  private constructor() {}

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  async getDailyFortune(): Promise<DailyFortune> {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const fortunes = [
      {
        cardName: "The Star",
        message: "Hôm nay là ngày của những hy vọng mới. Vũ trụ đang lắng nghe những mong ước thầm kín của bạn.",
        cardImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=300&h=500&auto=format&fit=crop"
      },
      {
        cardName: "The Sun",
        message: "Năng lượng tích cực lan tỏa. Bạn sẽ là tâm điểm của mọi sự chú ý và gặt hái thành công.",
        cardImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&h=500&auto=format&fit=crop"
      },
      {
        cardName: "The Moon",
        message: "Trực giác của bạn đang rất mạnh mẽ. Hãy lắng nghe tiếng nói bên trong thay vì những ồn ào bên ngoài.",
        cardImage: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=300&h=500&auto=format&fit=crop"
      }
    ];

    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[randomIndex];

    return {
      ...fortune,
      fortuneDate: format(new Date(), 'dd/MM/yyyy'),
      advice: {
        love: "Có thể có một cuộc gặp gỡ bất ngờ.",
        career: "Đừng ngần ngại đưa ra ý tưởng mới.",
        health: "Cần chú ý hơn đến giấc ngủ."
      },
      luckScore: 85 + Math.floor(Math.random() * 15)
    };
  }

  async getAstrologyAnalysis(profile: UserProfile): Promise<AstrologyResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (profile.type === 'Western') {
      return {
        sign: "Thiên Yết",
        personality: "Mạnh mẽ, sâu sắc và đầy bí ẩn. Bạn có khả năng thấu thị tâm tư người khác cực tốt.",
        career: "Khả năng tập trung cao độ sẽ giúp bạn hoàn thành những dự án khó nhất trong tháng này.",
        love: "Sự nồng nhiệt của bạn là thỏi nam châm thu hút đối phương."
      };
    } else {
      return {
        sign: "Tuổi Thìn",
        element: "Hỏa",
        personality: "Quyết đoán, tràn đầy năng lượng lãnh đạo và không ngại đối mặt với thử thách.",
        career: "Năm nay là năm để bứt phá. Những cơ hội kinh doanh mới đang chờ đón bạn.",
        love: "Cần học cách lắng nghe nhiều hơn để duy trì sự cân bằng."
      };
    }
  }

  async scanFace(imageUrl: string): Promise<ScanningResult> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      title: "Phân tích diện mạo",
      description: "Dựa trên các tổ hợp ngũ quan, bạn sở hữu phúc khí rất lớn.",
      details: [
        { label: "Trán", value: "Rộng và sáng - Sự nghiệp hanh thông, tầm nhìn xa trông rộng." },
        { label: "Mắt", value: "Tinh anh - Đời sống tinh thần phong phú, tình cảm sâu đậm." },
        { label: "Mũi", value: "Thẳng và đầy đặn - Tài lộc dồi dào, giữ được của cải." }
      ]
    };
  }

  async scanPalm(imageUrl: string): Promise<ScanningResult> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      title: "Giải mã chỉ tay",
      description: "Các đường chỉ tay chính của bạn rất rõ nét và mạch lạc.",
      details: [
        { label: "Sinh đạo", value: "Dài và cong - Sức khỏe dẻo dai, cuộc đời ít biến cố lớn." },
        { label: "Trí đạo", value: "Sâu và rõ - Thông minh, có khả năng phân tích logic tốt." },
        { label: "Tâm đạo", value: "Hướng về ngón trỏ - Người trọng tình nghĩa, chung thủy." }
      ]
    };
  }
}

export const apiService = APIService.getInstance();
