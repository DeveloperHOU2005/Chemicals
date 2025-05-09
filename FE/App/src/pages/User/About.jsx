import { ChevronRight, Award, Users, Globe, TrendingUp, Shield, Leaf, Zap, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Công Ty TNHH Hóa Chất XYZ</h2>
              <p className="text-lg text-gray-100 mb-6">Nhà cung cấp hóa chất hàng đầu Việt Nam với hơn 15 năm kinh nghiệm trong ngành</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Chất lượng cao</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Đa dạng sản phẩm</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Dịch vụ chuyên nghiệp</span>
                </div>
              </div>
            </div>
            <div className="w-max-[600px] w-[500px]">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="Công ty Hóa Chất XYZ" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Câu Chuyện Của Chúng Tôi</h2>
            <div className="h-1 w-24 bg-teal-600 mx-auto mb-6"></div>
            <p className="text-gray-600">Hành trình phát triển và khẳng định vị thế trong ngành hóa chất Việt Nam</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Khởi Đầu</h3>
              <p className="text-gray-600 mb-4">
                Công ty TNHH Hóa Chất XYZ được thành lập vào năm 2008 bởi các chuyên gia hàng đầu trong lĩnh vực hóa chất tại Việt Nam. 
                Với tầm nhìn trở thành nhà cung cấp hóa chất đáng tin cậy nhất trong khu vực, chúng tôi đã nỗ lực không ngừng để xây 
                dựng một hệ thống cung ứng hóa chất chất lượng cao, đáp ứng nhu cầu đa dạng của các ngành công nghiệp.
              </p>
              <p className="text-gray-600">
                Những ngày đầu, chúng tôi bắt đầu với một kho hàng nhỏ và đội ngũ chỉ 10 nhân viên. Dù quy mô còn khiêm tốn, nhưng 
                chúng tôi luôn đặt sự an toàn và chất lượng sản phẩm lên hàng đầu, tạo nền tảng vững chắc cho sự phát triển sau này.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Phát Triển & Thành Tựu</h3>
              <p className="text-gray-600 mb-4">
                Sau hơn 15 năm hoạt động, chúng tôi đã phát triển thành một trong những nhà phân phối hóa chất hàng đầu Việt Nam với 
                mạng lưới phân phối rộng khắp toàn quốc và khu vực Đông Nam Á. Hiện tại, công ty sở hữu 3 nhà máy sản xuất, 5 kho hàng 
                tiêu chuẩn quốc tế, và đội ngũ hơn 200 nhân viên chuyên nghiệp.
              </p>
              <p className="text-gray-600">
                Chúng tôi tự hào là đối tác tin cậy của hơn 1000 doanh nghiệp trong nhiều lĩnh vực như dược phẩm, nông nghiệp, công nghiệp 
                thực phẩm, sản xuất và các phòng thí nghiệm nghiên cứu. Các chứng nhận ISO 9001, ISO 14001 và các giải thưởng ngành hàng 
                năm là minh chứng cho cam kết chất lượng của chúng tôi.
              </p>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-16 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-200"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-16 md:text-right mb-4 md:mb-0">
                  <h4 className="text-xl font-bold text-gray-800">2008</h4>
                  <p className="text-gray-600 mt-2">Thành lập công ty với 10 nhân viên và danh mục 50 sản phẩm</p>
                </div>
                <div className="bg-teal-600 rounded-full h-8 w-8 border-4 border-white shadow"></div>
                <div className="md:w-[500px] md:pl-16">
                  <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="Năm 2008" className="rounded-lg shadow-md" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse items-center mb-12">
                <div className="md:w-1/2 md:pl-16 md:text-left mb-4 md:mb-0">
                  <h4 className="text-xl font-bold text-gray-800">2013</h4>
                  <p className="text-gray-600 mt-2">Mở rộng thị trường xuất khẩu sang các nước ASEAN và đạt chứng nhận ISO 9001</p>
                </div>
                <div className="bg-teal-600 rounded-full h-8 w-8 border-4 border-white shadow"></div>
                <div className="md:w-[500px] md:pr-16">
                  <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="Năm 2013" className="rounded-lg shadow-md" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-16 md:text-right mb-4 md:mb-0">
                  <h4 className="text-xl font-bold text-gray-800">2018</h4>
                  <p className="text-gray-600 mt-2">Khai trương nhà máy sản xuất thứ hai và mở thêm chi nhánh tại 3 thành phố lớn</p>
                </div>
                <div className="bg-teal-600 rounded-full h-8 w-8 border-4 border-white shadow"></div>
                <div className="md:w-[500px] md:pl-16">
                  <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="Năm 2018" className="rounded-lg shadow-md" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-16 md:text-left mb-4 md:mb-0">
                  <h4 className="text-xl font-bold text-gray-800">2023</h4>
                  <p className="text-gray-600 mt-2">Đạt mốc 1000+ đối tác và triển khai hệ thống thương mại điện tử B2B</p>
                </div>
                <div className="bg-teal-600 rounded-full h-8 w-8 border-4 border-white shadow"></div>
                <div className="md:w-[500px] md:pr-16">
                  <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="Năm 2023" className="rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tầm Nhìn & Sứ Mệnh</h2>
            <div className="h-1 w-24 bg-teal-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-teal-600">
              <Globe className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tầm Nhìn</h3>
              <p className="text-gray-600">
                Trở thành nhà cung cấp hóa chất hàng đầu khu vực Đông Nam Á, được công nhận về chất lượng sản phẩm, 
                dịch vụ chuyên nghiệp và các giải pháp bền vững cho ngành công nghiệp hóa chất. Chúng tôi hướng tới việc 
                xây dựng một hệ sinh thái cung ứng hóa chất an toàn, hiệu quả và thân thiện với môi trường.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-teal-600">
              <TrendingUp className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sứ Mệnh</h3>
              <p className="text-gray-600">
                Cung cấp các sản phẩm hóa chất chất lượng cao với giá cả cạnh tranh, đáp ứng nhu cầu đa dạng của khách hàng. 
                Mang đến những giải pháp toàn diện, an toàn và hiệu quả cho các ngành công nghiệp, đồng thời thúc đẩy sự 
                phát triển bền vững thông qua việc áp dụng công nghệ tiên tiến và thực hành kinh doanh có trách nhiệm.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Giá Trị Cốt Lõi</h2>
            <div className="h-1 w-24 bg-teal-600 mx-auto mb-6"></div>
            <p className="text-gray-600">Những nguyên tắc định hướng mọi hoạt động kinh doanh của chúng tôi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 p-4 rounded-full inline-block mb-4">
                <Award className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Chất Lượng</h3>
              <p className="text-gray-600">
                Cam kết cung cấp sản phẩm chất lượng cao nhất, đáp ứng hoặc vượt qua các tiêu chuẩn quốc tế và mong đợi của khách hàng.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 p-4 rounded-full inline-block mb-4">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">An Toàn</h3>
              <p className="text-gray-600">
                Đặt an toàn lên hàng đầu trong mọi hoạt động, từ sản xuất, lưu trữ đến vận chuyển hóa chất, đảm bảo an toàn cho nhân viên và khách hàng.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 p-4 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tận Tâm</h3>
              <p className="text-gray-600">
                Luôn lắng nghe và đáp ứng nhu cầu của khách hàng, cung cấp dịch vụ tư vấn chuyên nghiệp và hỗ trợ kỹ thuật tận tâm.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 p-4 rounded-full inline-block mb-4">
                <Leaf className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Bền Vững</h3>
              <p className="text-gray-600">
                Cam kết với các thực hành kinh doanh bền vững và giải pháp thân thiện với môi trường, giảm thiểu tác động sinh thái.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 p-4 rounded-full inline-block mb-4">
                <Zap className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Đổi Mới</h3>
              <p className="text-gray-600">
                Liên tục nghiên cứu và áp dụng công nghệ mới để cải tiến sản phẩm, quy trình và dịch vụ, mang lại giá trị cao nhất cho khách hàng.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 p-4 rounded-full inline-block mb-4">
                <CheckCircle className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Chính Trực</h3>
              <p className="text-gray-600">
                Duy trì tính minh bạch và đạo đức cao nhất trong mọi giao dịch kinh doanh, xây dựng niềm tin với đối tác và khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Đội Ngũ Lãnh Đạo</h2>
            <div className="h-1 w-24 bg-teal-300 mx-auto mb-6"></div>
            <p className="text-teal-100">Những chuyên gia hàng đầu đưa công ty vươn tới thành công</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-teal-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="CEO" className="object-cover w-full" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Nguyễn Văn A</h3>
                <p className="text-teal-200 mb-2">Tổng Giám Đốc</p>
                <p className="text-sm text-teal-300">Hơn 20 năm kinh nghiệm trong ngành hóa chất công nghiệp</p>
              </div>
            </div>
            
            <div className="bg-teal-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="COO" className="object-cover w-full" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Trần Thị B</h3>
                <p className="text-teal-200 mb-2">Giám Đốc Điều Hành</p>
                <p className="text-sm text-teal-300">Chuyên gia trong lĩnh vực chuỗi cung ứng và phát triển bền vững</p>
              </div>
            </div>
            
            <div className="bg-teal-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="CTO" className="object-cover w-full" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Lê Văn C</h3>
                <p className="text-teal-200 mb-2">Giám Đốc Kỹ Thuật</p>
                <p className="text-sm text-teal-300">Tiến sĩ Hóa học với nhiều công trình nghiên cứu được công nhận</p>
              </div>
            </div>
            
            <div className="bg-teal-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="CMO" className="object-cover w-full" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Phạm Thị D</h3>
                <p className="text-teal-200 mb-2">Giám Đốc Marketing</p>
                <p className="text-sm text-teal-300">Chuyên gia xây dựng thương hiệu B2B với 15 năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners & Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Đối Tác & Chứng Nhận</h2>
            <div className="h-1 w-24 bg-teal-600 mx-auto mb-6"></div>
            <p className="text-gray-600">Chúng tôi tự hào về mạng lưới đối tác và các chứng nhận quốc tế</p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Đối Tác Chiến Lược</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center h-24">
                  <img src={"https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg"} alt={`Partner ${i}`} className="max-h-full" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Chứng Nhận</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="ISO 9001" className="mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">ISO 9001:2015</h4>
                <p className="text-gray-600">Chứng nhận hệ thống quản lý chất lượng</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="ISO 14001" className="mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">ISO 14001:2015</h4>
                <p className="text-gray-600">Chứng nhận hệ thống quản lý môi trường</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img src="https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg" alt="ISO 45001" className="mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">ISO 45001:2018</h4>
                <p className="text-gray-600">Chứng nhận hệ thống quản lý an toàn và sức khỏe nghề nghiệp</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-700 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hãy Hợp Tác Cùng Chúng Tôi</h2>
          <p className="text-lg text-teal-100 mb-8 max-w-3xl mx-auto">
            Với kinh nghiệm phong phú và danh mục sản phẩm đa dạng, chúng tôi sẵn sàng đáp ứng mọi nhu cầu hóa chất 
            của doanh nghiệp bạn, từ số lượng nhỏ đến quy mô công nghiệp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/products" className="px-8 py-3 bg-white text-teal-700 font-bold rounded-md hover:bg-teal-50 transition-colors duration-300">
              Khám Phá Sản Phẩm
            </a>
            <a href="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-teal-600 transition-colors duration-300">
              Liên Hệ Ngay
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}