import {
  Typography,
  Card,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Progress,
  Tag,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProjectDashboardPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>()
  const { user } = useUserContext()

  // Fetch projects with related data
  const { data: projects, refetch } = Api.project.findMany.useQuery({
    include: {
      schedules: { include: { employee: true } },
      documents: true,
    },
  })

  // Fetch employees for task assignment
  const { data: employees } = Api.employee.findMany.useQuery({
    include: { user: true },
  })

  // Mutations
  const { mutateAsync: createSchedule } = Api.schedule.create.useMutation()

  const calculateProgress = (project: any) => {
    if (!project.startDate || !project.endDate) return 0
    const start = dayjs(project.startDate)
    const end = dayjs(project.endDate)
    const now = dayjs()
    const total = end.diff(start, 'day')
    const elapsed = now.diff(start, 'day')
    return Math.min(Math.max(Math.round((elapsed / total) * 100), 0), 100)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'green'
      case 'pending':
        return 'orange'
      case 'completed':
        return 'blue'
      default:
        return 'default'
    }
  }

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status || 'N/A'}</Tag>
      ),
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (_: any, record: any) => (
        <Progress percent={calculateProgress(record)} size="small" />
      ),
    },
    {
      title: 'Timeline',
      key: 'timeline',
      render: (_: any, record: any) => (
        <Space direction="vertical" size="small">
          <Text type="secondary">Start: {record.startDate || 'Not set'}</Text>
          <Text type="secondary">End: {record.endDate || 'Not set'}</Text>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setSelectedProject(record.id)
              setIsModalVisible(true)
            }}
          >
            <i className="las la-tasks"></i> Assign Task
          </Button>
          <Button href={`/documents?projectId=${record.id}`}>
            <i className="las la-file"></i> Documents
          </Button>
        </Space>
      ),
    },
  ]

  const handleAssignTask = async (values: any) => {
    try {
      await createSchedule({
        data: {
          startTime: values.startTime,
          endTime: values.endTime,
          type: values.taskType,
          employeeId: values.employeeId,
          projectId: selectedProject!,
        },
      })
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      console.error('Error assigning task:', error)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '24px' }}>
        <Col xs={24} xl={20}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={2}>
                <i className="las la-project-diagram"></i> Project Dashboard
              </Title>
              <Text type="secondary">
                Manage and monitor all your active construction projects in one
                place
              </Text>
            </div>

            <Card>
              <Table
                dataSource={projects}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>

            <Modal
              title="Assign Task"
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
            >
              <Form onFinish={handleAssignTask} layout="vertical">
                <Form.Item
                  name="employeeId"
                  label="Assign To"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {employees?.map(emp => (
                      <Select.Option key={emp.id} value={emp.id}>
                        {emp.user?.name || 'Unnamed Employee'}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="taskType"
                  label="Task Type"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="startTime"
                  label="Start Time"
                  rules={[{ required: true }]}
                >
                  <Input type="datetime-local" />
                </Form.Item>

                <Form.Item
                  name="endTime"
                  label="End Time"
                  rules={[{ required: true }]}
                >
                  <Input type="datetime-local" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Assign Task
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
