import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Card,
  Row,
  Col,
  Tabs,
} from 'antd'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
const { TabPane } = Tabs
type EmployeeWithRelations = Prisma.EmployeeGetPayload<{
  include: {
    user: true
    certifications: true
  }
}>
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function EmployeeHubPage() {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeWithRelations | null>(null)
  const { user } = useUserContext()

  const { data: employees, refetch: refetchEmployees } =
    Api.employee.findMany.useQuery({
      include: { user: true, certifications: true },
    })
  const { data: projects } = Api.project.findMany.useQuery({})
  const { mutateAsync: createEmployee } = Api.employee.create.useMutation()
  const { mutateAsync: updateEmployee } = Api.employee.update.useMutation()
  const { mutateAsync: createCertification } =
    Api.certification.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (selectedEmployee) {
        await updateEmployee({
          where: { id: selectedEmployee.id },
          data: values,
        })
      } else {
        await createEmployee({
          data: {
            ...values,
            userId: user?.id || '',
          },
        })
      }
      message.success('Employee saved successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetchEmployees()
    } catch (error) {
      message.error('Error saving employee')
    }
  }

  const handleAddCertification = async (employeeId: string, values: any) => {
    try {
      await createCertification({
        data: {
          ...values,
          employeeId,
        },
      })
      message.success('Certification added successfully')
      refetchEmployees()
    } catch (error) {
      message.error('Error adding certification')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (date: string) => (date ? dayjs(date).format('MM/DD/YYYY') : '-'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: EmployeeWithRelations) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedEmployee(record)
            form.setFieldsValue(record)
            setIsModalVisible(true)
          }}
        >
          <i className="las la-edit"></i> Edit
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>
              <i className="las la-users"></i> Employee Hub
            </Title>
            <Text>
              Manage employee profiles, certifications, and assignments
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setSelectedEmployee(null)
                form.resetFields()
                setIsModalVisible(true)
              }}
            >
              <i className="las la-plus"></i> Add Employee
            </Button>
          </Col>
        </Row>

        <Card>
          <Table
            dataSource={employees}
            columns={columns}
            rowKey="id"
            expandable={{
              expandedRowRender: (record: EmployeeWithRelations) => (
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Certifications" key="1">
                    <Row gutter={[16, 16]}>
                      {record.certifications?.map(cert => (
                        <Col span={8} key={cert.id}>
                          <Card size="small" title={cert.name}>
                            <p>
                              Issue Date:{' '}
                              {cert.issueDate
                                ? dayjs(cert.issueDate).format('MM/DD/YYYY')
                                : '-'}
                            </p>
                            <p>
                              Expiry Date:{' '}
                              {cert.expiryDate
                                ? dayjs(cert.expiryDate).format('MM/DD/YYYY')
                                : '-'}
                            </p>
                            <p>Status: {cert.status || '-'}</p>
                          </Card>
                        </Col>
                      ))}
                      <Col span={8}>
                        <Button
                          type="dashed"
                          block
                          onClick={() => {
                            Modal.confirm({
                              title: 'Add Certification',
                              content: (
                                <Form
                                  onFinish={values =>
                                    handleAddCertification(record.id, values)
                                  }
                                >
                                  <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name="issueDate"
                                    label="Issue Date"
                                  >
                                    <DatePicker />
                                  </Form.Item>
                                  <Form.Item
                                    name="expiryDate"
                                    label="Expiry Date"
                                  >
                                    <DatePicker />
                                  </Form.Item>
                                  <Form.Item name="status" label="Status">
                                    <Select>
                                      <Select.Option value="ACTIVE">
                                        Active
                                      </Select.Option>
                                      <Select.Option value="EXPIRED">
                                        Expired
                                      </Select.Option>
                                    </Select>
                                  </Form.Item>
                                </Form>
                              ),
                              onOk: () => form.submit(),
                            })
                          }}
                        >
                          <i className="las la-plus"></i> Add Certification
                        </Button>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              ),
            }}
          />
        </Card>

        <Modal
          title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="emergencyContact" label="Emergency Contact">
              <Input />
            </Form.Item>
            <Form.Item name="hireDate" label="Hire Date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
