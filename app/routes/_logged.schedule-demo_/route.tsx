import {
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Card,
  Row,
  Col,
} from 'antd'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ScheduleDemoPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Demo creation mutation
  const { mutateAsync: createDemo } = Api.demo.create.useMutation()

  // Available time slots (you might want to make this dynamic based on your needs)
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ]

  // Areas of interest options
  const interestAreas = [
    'Project Management',
    'Time Tracking',
    'Document Management',
    'Employee Management',
    'Bid Management',
    'Scheduling',
  ]

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      const demoData = {
        name: values.name,
        email: values.email,
        company: values.company,
        phone: values.phone,
        preferredDate:
          dayjs(values.date).format('YYYY-MM-DD') + ' ' + values.timeSlot,
        interests: values.interests.join(', '),
        status: 'PENDING',
      }

      await createDemo({ data: demoData })

      message.success(
        'Demo scheduled successfully! You will receive a confirmation email shortly.',
      )
      form.resetFields()
      // Redirect to home page after successful submission
      navigate('/home')
    } catch (error) {
      message.error('Failed to schedule demo. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '2rem' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <i
                className="las la-calendar-check"
                style={{ fontSize: '3rem', color: '#1890ff' }}
              ></i>
              <Title level={2}>Schedule a Demo</Title>
              <Paragraph>
                Experience our powerful platform firsthand. Schedule a
                personalized demo with our team.
              </Paragraph>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  prefix={<i className="las la-user"></i>}
                  placeholder="John Doe"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  prefix={<i className="las la-envelope"></i>}
                  placeholder="john@example.com"
                />
              </Form.Item>

              <Form.Item name="company" label="Company Name">
                <Input
                  prefix={<i className="las la-building"></i>}
                  placeholder="Your Company"
                />
              </Form.Item>

              <Form.Item name="phone" label="Phone Number">
                <Input
                  prefix={<i className="las la-phone"></i>}
                  placeholder="+1 (123) 456-7890"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    label="Preferred Date"
                    rules={[
                      { required: true, message: 'Please select a date' },
                    ]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      disabledDate={current =>
                        current && current < dayjs().startOf('day')
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="timeSlot"
                    label="Preferred Time"
                    rules={[
                      { required: true, message: 'Please select a time slot' },
                    ]}
                  >
                    <Select placeholder="Select time slot">
                      {timeSlots.map(slot => (
                        <Select.Option key={slot} value={slot}>
                          {slot}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="interests"
                label="Areas of Interest"
                rules={[
                  {
                    required: true,
                    message: 'Please select at least one area of interest',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select areas of interest"
                  optionLabelProp="label"
                >
                  {interestAreas.map(interest => (
                    <Select.Option
                      key={interest}
                      value={interest}
                      label={interest}
                    >
                      {interest}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  icon={<i className="las la-calendar-plus"></i>}
                >
                  Schedule Demo
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
