import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Smile, Meh, Frown, Star } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

const ProductReviews = () => {
  const sampleReviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm rất tốt, đóng gói cẩn thận!",
      date: "2023-12-01",
      sentiment: "positive",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 3,
      comment: "Sản phẩm tạm được, cần cải thiện thêm",
      date: "2023-11-30",
      sentiment: "neutral",
    },
    {
      id: 3,
      user: "Lê Văn C",
      rating: 2,
      comment: "Không hài lòng với chất lượng",
      date: "2023-11-29",
      sentiment: "negative",
    },
  ];

  const chartData = [
    { month: '01/2023', positive: 15, neutral: 5, negative: 2 },
    { month: '02/2023', positive: 18, neutral: 7, negative: 3 },
    { month: '03/2023', positive: 12, neutral: 8, negative: 4 },
    { month: '04/2023', positive: 20, neutral: 6, negative: 2 },
    { month: '05/2023', positive: 25, neutral: 4, negative: 1 },
  ];

  const ratingDistribution = [
    { rating: '5 sao', count: 45 },
    { rating: '4 sao', count: 30 },
    { rating: '3 sao', count: 15 },
    { rating: '2 sao', count: 7 },
    { rating: '1 sao', count: 3 },
  ];

  const [reviews] = useState(sampleReviews);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="text-green-500" />;
      case 'neutral':
        return <Meh className="text-yellow-500" />;
      case 'negative':
        return <Frown className="text-red-500" />;
      default:
        return null;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        } fill-current`}
      />
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Đánh giá sản phẩm</h2>
        <div className="flex gap-6">
          <div className="bg-green-100 p-4 rounded-lg flex-1">
            <p className="text-sm text-green-800 mb-1">Đánh giá tích cực</p>
            <div className="flex items-center gap-2">
              <ThumbsUp className="text-green-500" />
              <span className="font-semibold">
                {reviews.filter(r => r.sentiment === 'positive').length}
              </span>
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg flex-1">
            <p className="text-sm text-red-800 mb-1">Đánh giá tiêu cực</p>
            <div className="flex items-center gap-2">
              <ThumbsDown className="text-red-500" />
              <span className="font-semibold">
                {reviews.filter(r => r.sentiment === 'negative').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ đánh giá theo thời gian */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Xu hướng đánh giá theo thời gian</h3>
        <LineChart width={800} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#10B981" />
          <Line type="monotone" dataKey="neutral" stroke="#F59E0B" />
          <Line type="monotone" dataKey="negative" stroke="#EF4444" />
        </LineChart>
      </div>

      {/* Biểu đồ phân bố số sao */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Phân bố số sao đánh giá</h3>
        <BarChart width={800} height={300} data={ratingDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </div>

      {/* Danh sách đánh giá */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">{review.user}</p>
                <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {getSentimentIcon(review.sentiment)}
                <span>{review.date}</span>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
