
export default function PostCard (post) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
       <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600">{post.content}</p>
    </div>
  );
}