import { ReactNode } from 'react'
import { Heading, Img, Text } from 'src/components'
import { Button } from 'src/components/ui/button'
import { Instagram, Youtube, Facebook, MapPin } from 'lucide-react'
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any
  renderProps: ReactNode
}
const EventDetailPage = ({ event, renderProps }: Props, className: string) => {
  return (
    <div className='container-xl'>
      <div className={`${className} mt-5 flex container-xl flex-row justify-between`}>
        <div className='flex md:flex-col'>
          <div className='flex w-[41%] flex-row items-start pb-[31px] md:w-full sm:pb-5'>
            <div className='w-[40%] mr-[40px]'>
              <Img src='' alt='thumnal_event' className='h-[286px] w-[375px] rounded-[30px] object-cover mb-[40px]' />
              <div className='flex flex-col'>
                <div className='flex flex-col items-start justify-between gap-5'>
                  <div className='flex items-center justify-between gap-[15px]'>
                    <Img
                      src='logo.png'
                      alt='Logo_subriceIcon'
                      className='h-[32px] w-[32px] rounded-[5px] object-cover'
                    />
                    <div className='flex flex-col items-start gap-0.5'>
                      <Text size='xs' as='p' className='!font-medium !'>
                        Presented by
                      </Text>
                      <Text size='s' as='p'>
                        {/* <span className='font-semibold'>{event.event_operator.user_name}</span> */}
                        <span className='font-semibold'>Nam Dep Trai</span>
                      </Text>
                    </div>
                    {/* <RightOutlined className='mt-4 ' /> */}
                    <Img src='' alt='subriceicon' className='h-[49px] w-[14%] ml-9 object-cover' />
                  </div>
                  <div className='flex gap-[15px]'>
                    <Instagram className='h-[16px] w-[16px] ' />
                    <Youtube className='h-[16px] w-[16px] ' />
                    <Facebook className='h-[16px] w-[16px] ' />
                  </div>
                </div>
              </div>
              <div className='mt-11 flex flex-col items-start gap-[11px] self-stretch pb-2.5'>
                <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <Heading size='md' as='h6' className=''>
                    Speacker
                  </Heading>
                  <div className='h-[0.5px] w-full self-stretch bg-black_light opacity-20' />
                </div>
                <div className='flex w-[77%] flex-col gap-3.5 md:w-full'>
                  <Text size='md' as='p' className=' !font-monterat'>
                    {/* {event.speaker_name} */}
                    Nam Nguyen
                  </Text>
                  <div className='flex gap-[15px]'>
                    <Instagram className='h-[16px] w-[16px] ' />
                    <Youtube className='h-[16px] w-[16px] ' />
                    <Facebook className='h-[16px] w-[16px] ' />
                  </div>
                  <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                    <Heading size='md' as='h6' className=''>
                      Sponser
                    </Heading>
                    <div className='h-[0.5px] w-full self-stretch bg-black_light opacity-20' />
                  </div>
                  <Text size='s' as='p' className=' !font-monterat'>
                    {/* {event.sponsor_name} */}
                    Coc Sai Gon
                  </Text>
                  <div className='flex gap-[15px]'>
                    <Instagram className='h-[16px] w-[16px] ' />
                    <Youtube className='h-[16px] w-[16px] ' />
                    <Facebook className='h-[16px] w-[16px] ' />
                  </div>
                </div>
              </div>
              <Text size='s' as='p' className='mt-[19px] cursor-pointer'>
                Contact the Host
              </Text>
              <Text size='s' as='p' className='mt-[19px] cursor-pointer'>
                Report Event
              </Text>
            </div>
            <div className='flex w-[49%] flex-coll gap-2 md:w-full'>
              <div className='flex flex-col items-start'>
                <Heading
                  size='s'
                  as='h1'
                  className='flex items-center justify-center bg-orange-600 bg-[#51606E] border  rounded-[10px] bg- p-[3px] '
                >
                  <span className='text-white-A700 p-1'>Featured in</span>
                  <span className='text-[#F4F5F6] p-1'>Ho Chi Minh City</span>
                </Heading>
                <Heading size='4xl' as='h3' className='mt-[20px]  w-full !font-monterat leading-[39px]'>
                  SaiGon Talk kỳ 8: Feelink - Feel Cảm Xúc, Link Sự Nghiệp
                  {/* {event.name} */}
                </Heading>
                <div className='mt-5 flex items-center gap-[21px]'>
                  <div className='flex flex-col items-center gap-[3px] rounded-md border border-solid border-black_dark  pb-0.5 shadow-sm'>
                    <div className='flex w-[40px] justify-center rounded-tl-md rounded-tr-md border border-solid  bg-[#51606E] px-[3px] pb-0.5 pt-[3px]'>
                      <Heading size='xs' as='h4' className='!font-monterat !text-white-A700 '>
                        {/* {dateObj.toLocaleString('en-US', {
                          month: 'short'
                        })} */}
                        25/07/2024
                      </Heading>
                    </div>
                    <Text size='md' as='p' className='!font-monterat'>
                      {/* {time[0]} */}
                      14:00 - 14:30
                    </Text>
                  </div>
                  <div className='flex flex-col items-start gap-1 self-start'>
                    <Heading size='lg' as='h5' className=''>
                      Thursday, May 9{/* {event.date_event} */}
                    </Heading>
                    <Text size='md' as='p' className='!font-monterat'>
                      5:30 PM - 8:30 PM
                      {/* {event.time_start} - {event.time_end} */}
                    </Text>
                  </div>
                </div>
                <div className='flex items-center gap-[21px]'>
                  <div className='mt-[22px] flex items-center gap-[21px] rounded-md border border-solid border-black_dark  pb-0.5 shadow-sm'>
                    <Button size='icon' variant='outline' className='w-[40px] h-[33px] border !rounded-md'>
                      <MapPin className='' />
                    </Button>
                  </div>
                  <div className='flex flex-col items-start mt-[22px] gap-[5px] self-start'>
                    <Heading size='lg' as='h6' className=''>
                      Address
                    </Heading>
                    <Text size='md' as='p' className='!font-monterat'>
                      Thành phố Thủ Đức, Thành Phố Hồ Chí Minh
                      {/* {event.address} */}
                    </Text>
                  </div>
                </div>
                {renderProps}
                <Text size='lg' as='p' className=' !font-bold ml-1.5 mt-[30px] md:ml-0'>
                  About Event
                </Text>
                <div className='flex flex-col items-start'>
                  <div className='mt-4 ml-6 h-px self-stretch bg-black_supper_light opacity-50 md:ml-0' />
                  <Text size='md' as='p' className='mt-[17px] w-[98%] leading-4 md:w-full !font-medium !font-monterat'>
                    {/* <div
                      className=''
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(event.description) //loại bỏ javascript khỏi đây
                      }}
                    ></div> */}
                    🔥Sinh viên chia sẻ “trải nghiệm vượt ngàn chông gai" gọi tên nhà F … ✨Cổng trường Đại học luôn là
                    bước ngoặt lớn đối với tất cả bạn trẻ dù ở thời đại nào. Không chỉ mở ra cánh cửa với muôn vàn điều
                    mới mẻ, hấp dẫn; bước chuyển này cũng là giai đoạn chẳng mấy dễ dàng khi người trẻ phải nỗ lực nhiều
                    hơn, tự lập nhiều hơn, có trách nhiệm hơn với mọi quyết định của cá nhân mình. 😉Hoạt động tương tác
                    sử dụng mẫu CapCut được khởi động vừa là khoảnh khắc để bạn nhìn lại hành trình trải nghiệm, đổi
                    thay và phát triển cá nhân, vừa là cơ hội để “flex" với nhau những trải nghiệm độc đáo chỉ bạn mới
                    có trên nền nhạc cực chất. 🔥 Đừng bỏ lỡ cơ hội tỏa sáng và truyền cảm hứng cho cộng đồng với mẫu
                    CapCut “FUNIVERSITY”. Thao tác vô cùng đơn giản, theo các bước dưới đây: 1️⃣ Bước 1: Truy cập link
                    mẫu: https://www.capcut.com/t/Zs8ryw9gL 2️⃣ Bước 2: Thay ảnh hoặc video phù hợp thể hiện được trải
                    nghiệm của bạn ở quãng thời gian Đại học (Gợi ý: có thể chọn những hình ảnh từ "ngày xửa ngày xưa"
                    và hình ảnh "phiên bản nâng cấp" của bạn của hiện tại) 3️⃣ Bước 3: Lưu lại video và đăng tải lên
                    trang TikTok cá nhân ở chế độ công khai (Public) kèm hashtag #FUniversity #FPTUTuoi18
                    #Trainghiemvuottroi #FPTUniversity 🤫 "FUNIVERSITY" là nơi bạn thể hiện sự tự tin và sáng tạo của
                    bản thân. Cùng nhau tạo nên những khoảnh khắc đáng nhớ, đồng thời lan tỏa tinh thần học tập và trải
                    nghiệm cùng FUNIVERSITY đến mọi người nhé!
                  </Text>
                  <div className='mt-9 flex flex-col items-start gap-2 self-stretch '>
                    <Text size='lg' as='p' className=' !font-bold'>
                      {/* {`Location ${event.location}`} */}
                      HCM
                    </Text>
                    <div className='ml-6 h-px self-stretch bg-black_supper_light opacity-50 md:ml-0' />
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415305243!2d106.80730807603385!3d10.841132857994813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1720796162009!5m2!1svi!2s'
                      width='700'
                      height='200'
                      style={{
                        border: 0,
                        borderRadius: '15px',
                        marginTop: '10px'
                      }}
                      allowFullScreen={true}
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EventDetailPage
