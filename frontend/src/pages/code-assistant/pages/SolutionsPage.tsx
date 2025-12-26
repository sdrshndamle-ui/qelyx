import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Space, Modal, Tag, Progress, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Project } from '../types';
import { getProjects, deleteProject } from '../utils/storage';
import { COMPLEXITY_COLORS } from '../utils/constants';
import CreateProjectModal from '../components/CreateProjectModal';
import './SolutionsPage.css';
import dayjs from 'dayjs';

const SolutionsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  };

  const handleDelete = (projectId: string) => {
    Modal.confirm({
      title: 'Delete Project',
      content: 'Are you sure you want to delete this project? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        deleteProject(projectId);
        loadProjects();
        message.success('Project deleted successfully');
      },
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsCreateModalVisible(true);
  };

  const handleView = (projectId: string) => {
    navigate(`/code-assistant/project/${projectId}`);
  };

  const handleRowClick = (record: Project) => {
    return {
      onClick: () => {
        handleView(record.id);
      },
    };
  };

  const handleModalClose = () => {
    setIsCreateModalVisible(false);
    setEditingProject(null);
    loadProjects();
  };

  const columns: ColumnsType<Project> = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (id: string) => <span style={{ color: '#00d9ff' }}>{id}</span>,
    },
    {
      title: 'Source Technology',
      dataIndex: 'sourceTechnology',
      key: 'sourceTechnology',
      width: 180,
    },
    {
      title: 'Target Technology',
      dataIndex: 'targetTechnology',
      key: 'targetTechnology',
      width: 180,
      render: (tech: string) => tech || <span style={{ color: 'rgba(148, 163, 184, 0.8)' }}>Not set</span>,
    },
    {
      title: 'Objects',
      dataIndex: 'numberOfObjects',
      key: 'numberOfObjects',
      width: 100,
      align: 'center',
    },
    {
      title: 'Complexity',
      dataIndex: 'overallComplexity',
      key: 'overallComplexity',
      width: 120,
      render: (complexity: string) => (
        <Tag color={COMPLEXITY_COLORS[complexity as keyof typeof COMPLEXITY_COLORS]}>
          {complexity}
        </Tag>
      ),
    },
    {
      title: 'Creation Date',
      dataIndex: 'projectCreationDate',
      key: 'projectCreationDate',
      width: 150,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Completion',
      dataIndex: 'percentageCompletion',
      key: 'percentageCompletion',
      width: 150,
      render: (percentage: number) => (
        <Progress
          percent={percentage}
          size="small"
          strokeColor={{
            '0%': '#00d9ff',
            '100%': '#0ea5e9',
          }}
        />
      ),
    },
    {
      title: 'Productivity Gain',
      dataIndex: 'productivityGainPercent',
      key: 'productivityGainPercent',
      width: 150,
      render: (gain: number) => (
        <span style={{ color: '#52c41a' }}>+{gain}%</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleView(record.id);
            }}
            style={{ color: '#00d9ff' }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
            style={{ color: '#00d9ff' }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="solutions-page">
      <div className="section-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Projects</h1>
            <p className="page-description">
              Manage your code migration projects and track progress
            </p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
            className="create-button"
          >
            Create New Project
          </Button>
        </div>

        <div className="projects-table-container">
          <Table
            columns={columns}
            dataSource={projects}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1400 }}
            className="projects-table"
            onRow={handleRowClick}
          />
        </div>

        <CreateProjectModal
          visible={isCreateModalVisible}
          onClose={handleModalClose}
          project={editingProject}
        />
      </div>
    </div>
  );
};

export default SolutionsPage;
