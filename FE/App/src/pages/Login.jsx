import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log('Đăng nhập với:', { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Phần bên trái - Hình ảnh và thông tin */}
      <div className="hidden md:flex md:w-1/2 bg-sky-600 text-white p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 to-cyan-800 opacity-90"></div>
        <div className="relative z-10">
          <div className='flex mb-6 gap-5 items-center'>
            <img
              className="h-24 rounded-full w-auto"
              src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"
              alt="Logo của ChemicalStore"
            />
            <h1 className="text-4xl font-bold">ChemicalStore</h1>
          </div>
            <p className="text-xl mb-8">Nền tảng mua sắm hóa chất chuyên nghiệp dành cho phòng thí nghiệm và doanh nghiệp</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-indigo-500 p-2 rounded-full mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p>Chất lượng đảm bảo với chứng nhận quốc tế</p>
            </div>
            <div className="flex items-center">
              <div className="bg-indigo-500 p-2 rounded-full mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p>Giao hàng nhanh chóng và an toàn</p>
            </div>
            <div className="flex items-center">
              <div className="bg-indigo-500 p-2 rounded-full mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p>Hỗ trợ kỹ thuật 24/7</p>
            </div>
          </div>
        </div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
            <g fill="#fff">
              <path d="M0 0h40v40H0zm40 40h40v40H40z"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* Phần bên phải - Form đăng nhập */}
      <div className="flex flex-col justify-center p-6 md:p-12 md:w-1/2 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Đăng nhập
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Đăng nhập để tiếp tục trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                UserName
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="UserName"
                  name="UserName"
                  type="UserName"
                  autoComplete="UserName"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập UserName của bạn"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập mật khẩu"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="h-5 w-5 mr-2" fill="#4285F4" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="h-5 w-5 mr-2" fill="#4267B2" viewBox="0 0 24 24">
                  <path d="M22,12.1c0-5.7-4.6-10.3-10.3-10.3S1.5,6.4,1.5,12.1c0,5.1,3.7,9.4,8.6,10.2v-7.2h-2.6v-3h2.6V9.5c0-2.6,1.5-4,3.9-4c1.1,0,2.3,0.2,2.3,0.2v2.5h-1.3c-1.3,0-1.7,0.8-1.7,1.6v1.9h2.9l-0.5,3h-2.4v7.2C18.3,21.6,22,17.3,22,12.1z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bạn chưa có tài khoản?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;