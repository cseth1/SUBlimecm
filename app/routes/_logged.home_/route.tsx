import { Typography, Row, Col, Card, Button, Form, Input, message } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // Newsletter subscription mutation
  const { mutateAsync: subscribeNewsletter } =
    Api.newsletter.create.useMutation()

  // Demo scheduling mutation
  const { mutateAsync: scheduleDemo } = Api.demo.create.useMutation()

  const handleNewsletterSubmit = async (values: { email: string }) => {
    try {
      await subscribeNewsletter({
        data: {
          email: values.email,
          subscriptionDate: new Date().toISOString(),
          status: 'ACTIVE',
        },
      })
      message.success('Successfully subscribed to newsletter!')
      form.resetFields()
    } catch (error) {
      message.error('Failed to subscribe to newsletter')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <Row gutter={[24, 24]} align="middle" justify="center">
          <Col xs={24} md={12}>
            <Title level={1}>Streamline Your Subcontracting Business</Title>
            <Paragraph style={{ fontSize: '18px' }}>
              Sublime Time provides powerful tools to manage your time,
              projects, and workforce efficiently.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/schedule-demo')}
              icon={<i className="las la-calendar-check" />}
            >
              Schedule a Demo
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/demo-video-id"
                title="Product Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Card>
          </Col>
        </Row>

        {/* Features Section */}
        <Row gutter={[24, 24]} style={{ marginTop: '4rem' }}>
          <Col xs={24}>
            <Title level={2} style={{ textAlign: 'center' }}>
              Key Features
            </Title>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <i
                className="las la-clock"
                style={{ fontSize: '2rem', color: '#1890ff' }}
              />
              <Title level={4}>Time Management</Title>
              <Paragraph>
                Track employee hours, manage schedules, and monitor project
                timelines efficiently.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <i
                className="las la-project-diagram"
                style={{ fontSize: '2rem', color: '#1890ff' }}
              />
              <Title level={4}>Project Dashboard</Title>
              <Paragraph>
                Get a comprehensive view of all your projects and their progress
                in real-time.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <i
                className="las la-file-alt"
                style={{ fontSize: '2rem', color: '#1890ff' }}
              />
              <Title level={4}>Document Management</Title>
              <Paragraph>
                Store and manage all your important documents in one secure
                location.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Newsletter Section */}
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col xs={24} md={16}>
            <Card>
              <Title level={3} style={{ textAlign: 'center' }}>
                Subscribe to Our Newsletter
              </Title>
              <Paragraph style={{ textAlign: 'center' }}>
                Stay updated with the latest features and industry news.
              </Paragraph>
              <Form
                form={form}
                onFinish={handleNewsletterSubmit}
                layout="inline"
                style={{ justifyContent: 'center' }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                >
                  <Input
                    prefix={<i className="las la-envelope" />}
                    placeholder="Enter your email"
                    style={{ width: '300px' }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Subscribe
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
