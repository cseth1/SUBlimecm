import {
  Typography,
  Table,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Tag,
  Space,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TimeManagementPage() {
  const { user } = useUserContext()
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [photoModalVisible, setPhotoModalVisible] = useState(false)

  // Fetch time entries with user and project relations
  const { data: timeEntries, isLoading } = Api.timeEntry.findMany.useQuery({
    include: {
      user: true,
      project: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const columns = [
    {
      title: 'Employee',
      dataIndex: ['user', 'name'],
      key: 'userName',
    },
    {
      title: 'Project',
      dataIndex: ['project', 'name'],
      key: 'projectName',
    },
    {
      title: 'Clock In',
      dataIndex: 'clockIn',
      key: 'clockIn',
      render: (text: string) => dayjs(text).format('MMM DD, YYYY HH:mm'),
    },
    {
      title: 'Clock Out',
      dataIndex: 'clockOut',
      key: 'clockOut',
      render: (text: string) =>
        text ? dayjs(text).format('MMM DD, YYYY HH:mm') : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
          {status || 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'GPS Location',
      key: 'gpsLocation',
      render: (_: any, record: any) => (
        <Button
          type="link"
          icon={<i className="las la-map-marker" />}
          onClick={() =>
            Modal.info({
              title: 'GPS Location',
              content: record.gpsLocation || 'No GPS data available',
            })
          }
        >
          View Location
        </Button>
      ),
    },
    {
      title: 'Photo',
      key: 'photo',
      render: (_: any, record: any) => (
        <Button
          type="link"
          disabled={!record.photoUrl}
          icon={<i className="las la-camera" />}
          onClick={() => {
            setSelectedEntry(record)
            setPhotoModalVisible(true)
          }}
        >
          View Photo
        </Button>
      ),
    },
  ]

  const calculateTotalHours = (entry: any) => {
    if (!entry.clockOut) return 0
    const start = dayjs(entry.clockIn)
    const end = dayjs(entry.clockOut)
    return end.diff(start, 'hour', true).toFixed(2)
  }

  const stats = {
    totalEntries: timeEntries?.length || 0,
    activeEmployees:
      timeEntries?.filter(e => e.status === 'ACTIVE').length || 0,
    totalHours:
      timeEntries
        ?.reduce((acc, entry) => acc + Number(calculateTotalHours(entry)), 0)
        .toFixed(2) || 0,
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-clock" style={{ marginRight: '8px' }} />
          Time Management Dashboard
        </Title>
        <Text type="secondary">
          Monitor employee attendance, verify locations, and manage work hours
        </Text>

        <Row
          gutter={[16, 16]}
          style={{ marginTop: '24px', marginBottom: '24px' }}
        >
          <Col xs={24} sm={8}>
            <Card>
              <Space direction="vertical">
                <i
                  className="las la-users"
                  style={{ fontSize: '24px', color: '#1890ff' }}
                />
                <Text type="secondary">Total Entries</Text>
                <Title level={3}>{stats.totalEntries}</Title>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Space direction="vertical">
                <i
                  className="las la-user-clock"
                  style={{ fontSize: '24px', color: '#52c41a' }}
                />
                <Text type="secondary">Active Employees</Text>
                <Title level={3}>{stats.activeEmployees}</Title>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Space direction="vertical">
                <i
                  className="las la-hourglass-half"
                  style={{ fontSize: '24px', color: '#faad14' }}
                />
                <Text type="secondary">Total Hours</Text>
                <Title level={3}>{stats.totalHours}</Title>
              </Space>
            </Card>
          </Col>
        </Row>

        <Card>
          <Table
            columns={columns}
            dataSource={timeEntries}
            loading={isLoading}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Card>

        <Modal
          title="Attendance Photo"
          open={photoModalVisible}
          onCancel={() => setPhotoModalVisible(false)}
          footer={null}
        >
          {selectedEntry?.photoUrl ? (
            <img
              src={selectedEntry.photoUrl}
              alt="Attendance"
              style={{ width: '100%' }}
            />
          ) : (
            <Text>No photo available</Text>
          )}
        </Modal>
      </div>
    </PageLayout>
  )
}
