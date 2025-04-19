import http from 'src/utils/http'
import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { CircleCheck, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card } from 'src/components/ui/card'
import { Separator } from 'src/components/ui/separator'

const getBankShortName = (code: string) => {
  const banks = [
    {
      name: 'Ngân hàng TMCP Công thương Việt Nam',
      code: 'ICB',
      bin: '970415',
      short_name: 'VietinBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Ngoại Thương Việt Nam',
      code: 'VCB',
      bin: '970436',
      short_name: 'Vietcombank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Quân đội',
      code: 'MB',
      bin: '970422',
      short_name: 'MBBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      short_name: 'ACB',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
      code: 'VPB',
      bin: '970432',
      short_name: 'VPBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Tiên Phong',
      code: 'TPB',
      bin: '970423',
      short_name: 'TPBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Hàng Hải',
      code: 'MSB',
      bin: '970426',
      short_name: 'MSB',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Nam Á',
      code: 'NAB',
      bin: '970428',
      short_name: 'NamABank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Bưu Điện Liên Việt',
      code: 'LPB',
      bin: '970449',
      short_name: 'LienVietPostBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Bản Việt',
      code: 'VCCB',
      bin: '970454',
      short_name: 'VietCapitalBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
      code: 'BIDV',
      bin: '970418',
      short_name: 'BIDV',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
      code: 'STB',
      bin: '970403',
      short_name: 'Sacombank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Quốc tế Việt Nam',
      code: 'VIB',
      bin: '970441',
      short_name: 'VIB',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
      code: 'HDB',
      bin: '970437',
      short_name: 'HDBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Đông Nam Á',
      code: 'SEAB',
      bin: '970440',
      short_name: 'SeABank',
      supported: true
    },
    {
      name: 'Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu',
      code: 'GPB',
      bin: '970408',
      short_name: 'GPBank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Đại Chúng Việt Nam',
      code: 'PVCB',
      bin: '970412',
      short_name: 'PVcomBank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Quốc Dân',
      code: 'NCB',
      bin: '970419',
      short_name: 'NCB',
      supported: false
    },
    {
      name: 'Ngân hàng TNHH MTV Shinhan Việt Nam',
      code: 'SHBVN',
      bin: '970424',
      short_name: 'ShinhanBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Sài Gòn',
      code: 'SCB',
      bin: '970429',
      short_name: 'SCB',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Xăng dầu Petrolimex',
      code: 'PGB',
      bin: '970430',
      short_name: 'PGBank',
      supported: false
    },
    {
      name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
      code: 'VBA',
      bin: '970405',
      short_name: 'Agribank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Kỹ thương Việt Nam',
      code: 'TCB',
      bin: '970407',
      short_name: 'Techcombank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Sài Gòn Công Thương',
      code: 'SGICB',
      bin: '970400',
      short_name: 'SaigonBank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Đông Á',
      code: 'DOB',
      bin: '970406',
      short_name: 'DongABank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Bắc Á',
      code: 'BAB',
      bin: '970409',
      short_name: 'BacABank',
      supported: true
    },
    {
      name: 'Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam',
      code: 'SCVN',
      bin: '970410',
      short_name: 'StandardChartered',
      supported: false
    },
    {
      name: 'Ngân hàng Thương mại TNHH MTV Đại Dương',
      code: 'Oceanbank',
      bin: '970414',
      short_name: 'Oceanbank',
      supported: false
    },
    {
      name: 'Ngân hàng Liên doanh Việt - Nga',
      code: 'VRB',
      bin: '970421',
      short_name: 'VRB',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP An Bình',
      code: 'ABB',
      bin: '970425',
      short_name: 'ABBANK',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Việt Á',
      code: 'VAB',
      bin: '970427',
      short_name: 'VietABank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam',
      code: 'EIB',
      bin: '970431',
      short_name: 'Eximbank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Việt Nam Thương Tín',
      code: 'VIETBANK',
      bin: '970433',
      short_name: 'VietBank',
      supported: false
    },
    {
      name: 'Ngân hàng TNHH Indovina',
      code: 'IVB',
      bin: '970434',
      short_name: 'IndovinaBank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Bảo Việt',
      code: 'BVB',
      bin: '970438',
      short_name: 'BaoVietBank',
      supported: false
    },
    {
      name: 'Ngân hàng TNHH MTV Public Việt Nam',
      code: 'PBVN',
      bin: '970439',
      short_name: 'PublicBank',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
      code: 'SHB',
      bin: '970443',
      short_name: 'SHB',
      supported: false
    },
    {
      name: 'Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam',
      code: 'CBB',
      bin: '970444',
      short_name: 'CBBank',
      supported: false
    },
    {
      name: 'Ngân hàng TMCP Phương Đông',
      code: 'OCB',
      bin: '970448',
      short_name: 'OCB',
      supported: true
    },
    {
      name: 'Ngân hàng TMCP Kiên Long',
      code: 'KLB',
      bin: '970452',
      short_name: 'KienLongBank',
      supported: true
    },
    {
      name: 'Ngân hàng TNHH MTV CIMB Việt Nam',
      code: 'CIMB',
      bin: '422589',
      short_name: 'CIMB',
      supported: false
    },
    {
      name: 'Ngân hàng TNHH MTV HSBC (Việt Nam)',
      code: 'HSBC',
      bin: '458761',
      short_name: 'HSBC',
      supported: false
    },
    {
      name: 'DBS Bank Ltd - Chi nhánh Thành phố Hồ Chí Minh',
      code: 'DBS',
      bin: '796500',
      short_name: 'DBSBank',
      supported: false
    },
    {
      name: 'Ngân hàng Nonghyup - Chi nhánh Hà Nội',
      code: 'NHB HN',
      bin: '801011',
      short_name: 'Nonghyup',
      supported: false
    },
    {
      id: 13,
      name: 'Ngân hàng TNHH MTV Hong Leong Việt Nam',
      code: 'HLBVN',
      bin: '970442',
      short_name: 'HongLeong',
      supported: false
    },
    {
      name: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội',
      code: 'IBK - HN',
      bin: '970455',
      short_name: 'IBK Bank',
      supported: false
    },
    {
      name: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh',
      code: 'IBK - HCM',
      bin: '970456',
      short_name: 'IBK Bank',
      supported: false
    },
    {
      name: 'Ngân hàng TNHH MTV Woori Việt Nam',
      code: 'WVN',
      bin: '970457',
      short_name: 'Woori',
      supported: false
    },
    {
      name: 'Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh',
      code: 'UOB',
      bin: '970458',
      short_name: 'UnitedOverseas',
      supported: false
    },
    {
      name: 'Ngân hàng Kookmin - Chi nhánh Hà Nội',
      code: 'KBHN',
      bin: '970462',
      short_name: 'KookminHN',
      supported: false
    },
    {
      name: 'Ngân hàng Kookmin - Chi nhánh Thành phố Hồ Chí Minh',
      code: 'KBHCM',
      bin: '970463',
      short_name: 'KookminHCM',
      supported: false
    },
    {
      name: 'Ngân hàng Hợp tác xã Việt Nam',
      code: 'COOPBANK',
      bin: '970446',
      short_name: 'COOPBANK',
      supported: false
    }
  ]

  const bank = banks.find((b) => b.code === code)
  return bank || { name: '', code: '', bin: '', short_name: '', supported: false }
}

const EventPayment = () => {
  const navigate = useNavigate()
  const orderDetail = JSON.parse(localStorage.getItem('order-detail') || '{}')
  const isValidOrderDetail = Object.keys(orderDetail).length > 0 && orderDetail.order && orderDetail.qrUrl

  if (!isValidOrderDetail) {
    return <Navigate to='/' replace />
  }

  const { createdAt, name, paymentStatus, total, id } = orderDetail.order

  const url = new URL(orderDetail.qrUrl)

  const params = new URLSearchParams(url.search)

  const description = params.get('des')
  const bank = getBankShortName(params.get('bank') || '')
  const acc = params.get('acc')

  const { data } = useQuery({
    queryKey: ['order-detail', orderDetail],
    queryFn: async () => {
      const { data } = await http.get('SepayAuth/paymentsCheckingStatus?orderId=' + id)
      return data
    },
    refetchInterval: 2000,
    enabled: paymentStatus === 'Unpaid'
  })

  useEffect(() => {
    if (data && data.status === 'Paid') {
      const timer = setTimeout(() => {
        navigate('/', { replace: true })
        localStorage.removeItem('order-detail')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [data, paymentStatus, navigate])

  return (
    <div className='container-lg p-4 flex justify-center items-center h-screen w-full'>
      <div className='flex flex-col w-full'>
        <div className='flex items-center gap-2 mb-20'>
          <CircleCheck className='text-emerald-500 size-8' />
          <p className='text-3xl'>Ordered Successfully</p>
        </div>
        <Card className='glass p-4 grid grid-cols-12 gap-8'>
          <div className='col-span-6 flex flex-col'>
            <p className='font-semibold mb-4'>Option 1: Open your banking app and scan the QR Code</p>
            <img src={orderDetail.qrUrl} alt='qr-code' className='w-full h-full' />
            <p className='text-muted-foreground text-xs mt-2 text-center'>Scan this QR code to checkout</p>

            {data && data?.status === 'Unpaid' && (
              <div className='flex items-center mt-4 text-muted-foreground justify-center'>
                <p>Waiting for transaction...</p>
                <Loader2 className='animate-spin size-4 text-primary' />
              </div>
            )}
            {data && data?.status === 'Paid' && (
              <div className='flex items-center mt-4 text-muted-foreground justify-center'>
                <p>Transaction completed successfully</p>
                <CircleCheck className='text-emerald-500 size-4 ml-2' />
              </div>
            )}
          </div>
          <div className='col-span-6 flex flex-col gap-4 text-sm'>
            <p className='font-semibold text-base mb-4'>Option 2: Manually enter the below information</p>
            <p className='text-xl font-semibold truncate'>{name}</p>
            <Separator />
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Description</p>
              <p className='text-muted-foreground'>{description}</p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Bank</p>
              <p className='text-muted-foreground'>
                {bank.name} - {bank.short_name}
              </p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Account Number</p>
              <p className='text-muted-foreground'>{acc}</p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Ammount</p>
              <p className='text-muted-foreground'>{total}</p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>Created At</p>
              <p className='text-muted-foreground'>{format(parseISO(createdAt), "EEEE, MMMM d, yyyy 'at' h:mm a")}</p>
            </div>
            <div className='w-full mt-auto p-2 bg-accent rounded-lg text-primary font-medium'>
              <p>
                Please make sure to keep the original transaction description or else it won&apos;t work and you have to
                contact the admin!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EventPayment
