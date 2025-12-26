import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Tabs } from 'antd';
import { Project, ProjectObject } from '../types';
import { saveProject, getProject } from '../utils/storage';
import { COMMON_TECHNOLOGIES, COMPLEXITY_LEVELS } from '../utils/constants';
import ObjectManagement from './ObjectManagement';
import './CreateProjectModal.css';

interface CreateProjectModalProps {
  visible: boolean;
  onClose: () => void;
  project?: Project | null;
}

const CreateProjectModal = ({ visible, onClose, project }: CreateProjectModalProps) => {
  const [form] = Form.useForm();
  const [sourceTechManual, setSourceTechManual] = useState(false);
  const [objects, setObjects] = useState<ProjectObject[]>(project?.objects || []);
  const isEditing = !!project;

  useEffect(() => {
    if (visible) {
      if (project) {
        form.setFieldsValue({
          sourceTechnology: project.sourceTechnology,
          targetTechnology: project.targetTechnology || undefined,
        });
        setObjects(project.objects || []);
      } else {
        form.resetFields();
        setSourceTechManual(false);
        setObjects([]);
      }
    }
  }, [visible, project, form]);

  const handleSourceTechChange = (value: string) => {
    if (value === '__manual__') {
      setSourceTechManual(true);
      form.setFieldsValue({ sourceTechnology: '' });
    } else {
      setSourceTechManual(false);
    }
  };

  const calculateComplexity = (tech: string): 'Low' | 'Medium' | 'High' => {
    const legacyTechs = ['COBOL', 'RPG', 'Oracle Forms', 'PowerBuilder', 'VB.NET'];
    if (legacyTechs.some(lt => tech.toLowerCase().includes(lt.toLowerCase()))) {
      return 'High';
    }
    if (tech.toLowerCase().includes('sql') || tech.toLowerCase().includes('pl/')) {
      return 'Medium';
    }
    return 'Low';
  };

  const generateObjectCount = (tech: string): number => {
    return Math.floor(Math.random() * 50) + 10;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const sourceTech = values.sourceTechnology;

      // Update numberOfObjects based on actual objects array
      const objectCount = objects.length > 0 ? objects.length : (project?.numberOfObjects || 0);

      const projectData: Project = {
        id: project?.id || `PROJ-${Date.now()}`,
        sourceTechnology: sourceTech,
        targetTechnology: values.targetTechnology || undefined,
        numberOfObjects: objectCount,
        overallComplexity: project?.overallComplexity || calculateComplexity(sourceTech),
        projectCreationDate: project?.projectCreationDate || new Date().toISOString(),
        percentageCompletion: project?.percentageCompletion || 0,
        productivityGainPercent: project?.productivityGainPercent || 0,
        objects: objects,
      };

      saveProject(projectData);
      message.success(isEditing ? 'Project updated successfully' : 'Project created successfully');
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEditing ? 'Edit Project' : 'Create New Project'}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {isEditing ? 'Update' : 'Create'}
        </Button>,
      ]}
      width={900}
      className="create-project-modal"
    >
      <Tabs
        defaultActiveKey="project"
        items={[
          {
            key: 'project',
            label: 'Project Details',
            children: (
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  label="Source Technology"
                  name="sourceTechnology"
                  rules={[{ required: true, message: 'Please select or enter source technology' }]}
                >
                  {sourceTechManual ? (
                    <Input
                      placeholder="Enter source technology manually"
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setSourceTechManual(false);
                          form.setFieldsValue({ sourceTechnology: undefined });
                        }
                      }}
                    />
                  ) : (
                    <Select
                      placeholder="Select source technology or choose 'Other' to enter manually"
                      onChange={handleSourceTechChange}
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {COMMON_TECHNOLOGIES.map((tech) => (
                        <Select.Option key={tech.name} value={tech.name} label={tech.name}>
                          {tech.name}
                        </Select.Option>
                      ))}
                      <Select.Option key="__manual__" value="__manual__" label="Other (Enter manually)">
                        Other (Enter manually)
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item
                  label="Target Technology (Optional)"
                  name="targetTechnology"
                >
                  <Select
                    placeholder="Select target technology or choose 'Other' to enter manually"
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <div style={{ padding: '8px', borderTop: '1px solid rgba(148, 163, 184, 0.3)' }}>
                          <Button
                            type="text"
                            block
                            onClick={() => {
                              const value = prompt('Enter target technology manually:');
                              if (value) {
                                form.setFieldsValue({ targetTechnology: value });
                              }
                            }}
                          >
                            + Enter manually
                          </Button>
                        </div>
                      </>
                    )}
                  >
                    {COMMON_TECHNOLOGIES.map((tech) => (
                      <Select.Option key={tech.name} value={tech.name} label={tech.name}>
                        {tech.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {isEditing && (
                  <>
                    <Form.Item label="Number of Objects">
                      <Input disabled value={objects.length} />
                    </Form.Item>
                    <Form.Item label="Complexity">
                      <Input disabled value={project.overallComplexity} />
                    </Form.Item>
                    <Form.Item label="Creation Date">
                      <Input disabled value={new Date(project.projectCreationDate).toLocaleDateString()} />
                    </Form.Item>
                  </>
                )}
              </Form>
            ),
          },
          {
            key: 'objects',
            label: `Objects (${objects.length})`,
            children: form.getFieldValue('sourceTechnology') ? (
              <ObjectManagement
                objects={objects}
                sourceTechnology={form.getFieldValue('sourceTechnology') || project?.sourceTechnology || ''}
                onChange={setObjects}
              />
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(226, 232, 240, 0.6)' }}>
                Please select source technology first in the Project Details tab
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default CreateProjectModal;
