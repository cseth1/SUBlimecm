import {
  Typography,
  Input,
  Button,
  Table,
  Modal,
  Form,
  Upload,
  Select,
  Space,
  Card,
  Row,
  Col,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentCenterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<string>()
  const [selectedType, setSelectedType] = useState<string>()
  const [form] = Form.useForm()

  const { user } = useUserContext()
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch documents with projects included
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    include: { project: true },
  })

  // Fetch projects for dropdown
  const { data: projects } = Api.project.findMany.useQuery({})

  const { mutateAsync: createDocument } = Api.document.create.useMutation()

  const handleCreate = async (values: any) => {
    try {
      if (values.file?.[0]) {
        const uploadResult = await upload({
          file: values.file[0].originFileObj,
        })
        await createDocument({
          data: {
            name: values.name,
            type: values.type,
            fileUrl: uploadResult.url,
            category: values.category,
            projectId: values.projectId,
          },
        })
      }
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Error creating document:', error)
    }
  }

  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesProject = !selectedProject || doc.projectId === selectedProject
    const matchesType = !selectedType || doc.type === selectedType
    return matchesSearch && matchesProject && matchesType
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <i className="las la-file-alt" />
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Project',
      dataIndex: ['project', 'name'],
      key: 'project',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
  ]

  const documentTypes = [
    'Safety Report',
    'Compliance Document',
    'Work Order',
    'Construction Document',
  ]
  const documentCategories = [
    'Safety',
    'Compliance',
    'Operations',
    'Construction',
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Title level={2}>
              <i className="las la-folder-open" /> Document Center
            </Title>
            <Text>
              Manage all your project documents, safety reports, and work orders
              in one place.
            </Text>
          </Col>

          <Col span={24}>
            <Card>
              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="large"
              >
                <Row gutter={16} align="middle">
                  <Col xs={24} sm={8}>
                    <Search
                      placeholder="Search documents..."
                      onChange={e => setSearchTerm(e.target.value)}
                      allowClear
                    />
                  </Col>
                  <Col xs={24} sm={6}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Filter by Project"
                      allowClear
                      onChange={setSelectedProject}
                    >
                      {projects?.map(project => (
                        <Select.Option key={project.id} value={project.id}>
                          {project.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Filter by Type"
                      allowClear
                      onChange={setSelectedType}
                    >
                      {documentTypes.map(type => (
                        <Select.Option key={type} value={type}>
                          {type}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={24} sm={4}>
                    <Button
                      type="primary"
                      icon={<i className="las la-plus" />}
                      onClick={() => setIsModalOpen(true)}
                      block
                    >
                      Add Document
                    </Button>
                  </Col>
                </Row>

                <Table
                  columns={columns}
                  dataSource={filteredDocuments}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </Space>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Add New Document"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreate} layout="vertical">
            <Form.Item
              name="name"
              label="Document Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Document Type"
              rules={[{ required: true }]}
            >
              <Select>
                {documentTypes.map(type => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select>
                {documentCategories.map(category => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="projectId"
              label="Project"
              rules={[{ required: true }]}
            >
              <Select>
                {projects?.map(project => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="file"
              label="Upload File"
              rules={[{ required: true }]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<i className="las la-upload" />}>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Upload Document
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
