// src/data.js
import img1 from './assets/khong-gia-dinh.jpg'; 

export const listBooks = [
  {
    id: "1",
    title: "Life Of The Wild",
    author: "Hector Malot",
    price: 40.00,
    image: img1,
    category: "Adventure",
    pages: 350,
    // --- Bổ sung các thông tin chi tiết dưới đây ---
    publisher: "NXB Văn Học",
    issuedBy: "Công ty Nhã Nam",
    pubDate: "10/03/2023",
    size: "14.5 x 20.5 cm",
    coverType: "Bìa mềm",
    description: "Cuốn sách kinh điển về cậu bé Remi trên hành trình tìm kiếm gia đình...", 
    longDescription: `A Little Life kể về bốn người bạn cùng lớp đại học—tàn tạ, trôi dạt, và chỉ được nâng đỡ bởi tình bạn và tham vọng của họ—khi họ chuyển đến New York để tìm kiếm danh vọng và tiền bạc. 
    Trong khi mối quan hệ của họ, vốn nhuốm màu nghiện ngập, thành công và lòng kiêu hãnh, ngày càng sâu sắc hơn qua nhiều thập kỷ, những người đàn ông này vẫn gắn kết với nhau bằng lòng tận tụy của họ đối với Jude thông minh, bí ẩn, một người đàn ông mang trong mình vết sẹo từ một chấn thương thời thơ ấu không thể diễn tả thành lời.
    Một bài thánh ca về tình anh em và là sự miêu tả tuyệt vời về tình yêu trong thế kỷ 21, cuốn tiểu thuyết tuyệt đẹp của Hanya Yanagihara nói về những gia đình mà chúng ta sinh ra và những gia đình mà chúng ta tự tạo ra cho mình.`,
    reviews: [
      { text: "Một nghiên cứu sử thi về chấn thương và tình bạn được viết với sự thông minh.", source: "The Wall Street Journal" },
      { text: "Nắm bắt những khoảnh khắc rạng rỡ của vẻ đẹp và lòng tốt.", source: "John Powers, NPR" }
    ]
  },
  {
    id: "2",
    title: "Simple Way Of Piece Life",
    author: "Armor Ramsey",
    price: 38.00,
    image: "/path-to-another-image.jpg",
    category: "Life Style",
    pages: 200,
    // --- Bổ sung các thông tin chi tiết ---
    publisher: "NXB Trẻ",
    issuedBy: "Pan Macmillan",
    pubDate: "15/05/2022",
    size: "13 x 19 cm",
    coverType: "Bìa cứng",
    description: "Tìm lại sự bình yên trong tâm hồn qua những thói quen tối giản...",
    longDescription: "Nội dung chi tiết cho cuốn sách Simple Way Of Piece Life sẽ được hiển thị ở đây khi bạn nhấn nút xem thêm...",
    reviews: [
      { text: "Cuốn sách thay đổi tư duy về hạnh phúc.", source: "The New York Times" }
    ]
  }
];