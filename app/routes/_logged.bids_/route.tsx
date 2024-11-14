import {
  Typography,
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Table,
  Upload,
  Space,
  Row,
  Col,
  Statistic,
} from 'antd'
import { useState } from 'react'
import type { Bid, Project } from '@prisma/client'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BidManagementPage() {
  const [form] = Form.useForm()
  const { user } = useUserContext()
  const [selectedBid, setSelectedBid] = useState<string | null>(null)

  // Fetch bids with related project data
  const { data: bids, refetch } = Api.bid.findMany.useQuery({
    include: { project: true },
  })

  // Fetch projects for the dropdown
  const { data: projects } = Api.project.findMany.useQuery()

  // Mutations
  const { mutateAsync: createBid } = Api.bid.create.useMutation()
  const { mutateAsync: updateBid } = Api.bid.update.useMutation()
  const { mutateAsync: deleteBid } = Api.bid.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      const bidData = {
        title: values.title,
        amount: values.amount,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        status: values.status,
        description: values.description,
        projectId: values.projectId,
      }

      if (selectedBid) {
        await updateBid({
          where: { id: selectedBid },
          data: bidData,
        })
      } else {
        await createBid({ data: bidData })
      }

      form.resetFields()
      setSelectedBid(null)
      refetch()
    } catch (error) {
      console.error('Error submitting bid:', error)
    }
  }

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Project', dataIndex: ['project', 'name'], key: 'project' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Bid) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setSelectedBid(record.id)
              form.setFieldsValue({
                ...record,
                dueDate: dayjs(record.dueDate),
              })
            }}
          >
            <i className="las la-edit"></i>
          </Button>
          <Button
            type="link"
            danger
            onClick={async () => {
              await deleteBid({ where: { id: record.id } })
              refetch()
            }}
          >
            <i className="las la-trash"></i>
          </Button>
        </Space>
      ),
    },
  ]

  // Calculate statistics
  const totalBids = bids?.length || 0
  const activeBids = bids?.filter(bid => bid.status === 'ACTIVE').length || 0
  const wonBids = bids?.filter(bid => bid.status === 'WON').length || 0

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2}>
          <i className="las la-gavel"></i> Bid Management
        </Title>
        <Text>Manage and track your bids efficiently</Text>

        <Row gutter={16} style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Bids"
                value={totalBids}
                prefix={<i className="las la-clipboard-list"></i>}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Active Bids"
                value={activeBids}
                prefix={<i className="las la-clock"></i>}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Won Bids"
                value={wonBids}
                prefix={<i className="las la-trophy"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Card title="Create New Bid" style={{ marginBottom: '24px' }}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Bid Title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter bid title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="projectId"
                  label="Project"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select project">
                    {projects?.map(project => (
                      <Select.Option key={project.id} value={project.id}>
                        {project.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="amount"
                  label="Bid Amount"
                  rules={[{ required: true }]}
                >
                  <Input prefix="$" placeholder="Enter amount" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="dueDate"
                  label="Due Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select status">
                    <Select.Option value="DRAFT">Draft</Select.Option>
                    <Select.Option value="ACTIVE">Active</Select.Option>
                    <Select.Option value="WON">Won</Select.Option>
                    <Select.Option value="LOST">Lost</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="Description">
              <TextArea rows={4} placeholder="Enter bid description" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {selectedBid ? 'Update Bid' : 'Create Bid'}
              </Button>
              {selectedBid && (
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    form.resetFields()
                    setSelectedBid(null)
                  }}
                >
                  Cancel
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>

        <Card title="Bid List">
          <Table
            columns={columns}
            dataSource={bids}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
