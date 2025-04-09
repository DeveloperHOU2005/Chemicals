// components/Card.js
import { useContext } from "react";
import { ContentContext } from "../../App.jsx"; // Đường dẫn tương ứng

const Card = ({ deleteHandler, editHandler }) => {
  // Lấy dữ liệu từ context
  const { posts, articles } = useContext(ContentContext);

  // Ưu tiên hiển thị posts từ local state nếu có, còn không dùng API data
  const list = posts

  return (
    <>
      {list.map((item) => (
        <ul key={item.id} id="postsList">
          <li>
            <h2>{item.title}</h2>
            {item.urlToImage && <img src={item.urlToImage} alt="image" />}
            <small>{item.date || item.publishedAt}</small>
            <p>{item.content || item.description}</p>
            <small>By: {item.author}</small>
            <div className="flex gap-2">
              <button className="px-7 py-2" onClick={() => editHandler(item.id)}>Edit</button>
              <button className="delete px-7 py-2" onClick={() => deleteHandler(item.id)}>Delete</button>
            </div>
          </li>
        </ul>
      ))}
      
      {articles.map((item) => (
        <ul key={item.source.id} id="postsList" className="my-4">
          <li>
            <h2>{item.title}</h2>
            <img src={item.urlToImage} alt="image" />
            <small>{item.publishedAt}</small>
            <p>{item.description}</p>
            <small>By: {item.author}</small>
          </li>
        </ul>
      ))}
    </>
  );
};

export default Card;
