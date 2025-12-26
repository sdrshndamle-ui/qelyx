import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Menu, Card, Button, Table, Space, Checkbox, Select, Radio, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Project, ProjectObject, ConversionOptions } from '../types';
import { getProject, saveProject } from '../utils/storage';
import { COMMON_TECHNOLOGIES } from '../utils/constants';
import ProjectSummary from '../components/ProjectSummary';
import ObjectSelection from '../components/ObjectSelection';
import SynchronizedCodeView from '../components/SynchronizedCodeView';
import './ProjectDetailPage.css';

const { Sider, Content } = Layout;

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    generateDocumentation: false,
    extractBusinessRules: false,
    refactorOrRationalize: 'refactor',
  });
  const [targetTechnology, setTargetTechnology] = useState<string>('');
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('summary');

  useEffect(() => {
    if (projectId) {
      const loadedProject = getProject(projectId);
      if (loadedProject) {
        setProject(loadedProject);
        if (loadedProject.targetTechnology) {
          setTargetTechnology(loadedProject.targetTechnology);
        }
      } else {
        message.error('Project not found');
        navigate('/code-assistant/solutions');
      }
    }
  }, [projectId, navigate]);

  const menuItems: MenuProps['items'] = [
    {
      key: 'summary',
      label: 'Project Summary',
    },
    ...(project?.objects.map((obj) => ({
      key: `object-${obj.id}`,
      label: obj.name,
    })) || []),
  ];

  const handleGenerate = () => {
    if (selectedObjects.length === 0) {
      message.warning('Please select at least one object');
      return;
    }
    if (!targetTechnology) {
      message.warning('Please select target technology');
      return;
    }

    // Simulate code conversion
    const updatedProject = { ...project! };
    updatedProject.targetTechnology = targetTechnology;

    selectedObjects.forEach((objId) => {
      const obj = updatedProject.objects.find((o) => o.id === objId);
      if (obj) {
        // Generate sample converted code with confidence scores
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
        obj.convertedCode = generateConvertedCode(obj.originalCode, project!.sourceTechnology, targetTechnology);
        obj.confidenceScore = confidence;
        obj.needsReview = confidence < 85;

        if (conversionOptions.generateDocumentation) {
          obj.documentation = generateDocumentation(obj, project!.sourceTechnology, targetTechnology);
        }

        if (conversionOptions.extractBusinessRules) {
          obj.businessRules = extractBusinessRules(obj.originalCode);
        }
      }
    });

    // Update completion percentage
    const totalObjects = updatedProject.objects.length;
    const completedObjects = updatedProject.objects.filter((o) => o.convertedCode).length;
    updatedProject.percentageCompletion = Math.round((completedObjects / totalObjects) * 100);

    saveProject(updatedProject);
    setProject(updatedProject);
    message.success('Code conversion completed');
  };

  const generateConvertedCode = (originalCode: string, sourceTech: string, targetTech: string): string => {
    // Simulated conversion logic
    return `// Converted from ${sourceTech} to ${targetTech}\n// Confidence: High\n\n${originalCode.replace(/(\w+)/g, (match) => {
      if (match === sourceTech) return targetTech;
      return match;
    })}`;
  };

  const generateDocumentation = (obj: ProjectObject, sourceTech: string, targetTech: string): string => {
    return `# Documentation for ${obj.name}\n\n## Overview\nThis object was converted from ${sourceTech} to ${targetTech}.\n\n## Functionality\n[Documentation content here]\n\n## Notes\n- Conversion completed with high confidence\n- Review recommended for complex logic`;
  };

  const extractBusinessRules = (code: string): string => {
    return `# Business Rules for ${code.split('\n')[0] || 'Object'}\n\n1. Rule 1: [Extracted from code]\n2. Rule 2: [Extracted from code]\n3. Rule 3: [Extracted from code]`;
  };

  const handleSave = () => {
    if (project) {
      saveProject(project);
      message.success('Project saved successfully');
    }
  };

  const getCurrentObject = (): ProjectObject | null => {
    if (selectedMenuKey.startsWith('object-')) {
      const objId = selectedMenuKey.replace('object-', '');
      return project?.objects.find((o) => o.id === objId) || null;
    }
    return null;
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  const isSummaryView = selectedMenuKey === 'summary';
  const currentObject = getCurrentObject();

  return (
    <Layout className="project-detail-layout">
      <Sider width={250} className="project-sidebar">
        <div className="sidebar-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/code-assistant/solutions')}
            style={{ color: '#00d9ff', marginBottom: 16 }}
          >
            Back to Projects
          </Button>
          <div className="source-tech-label">Source Technology</div>
          <div className="source-tech-value">{project.sourceTechnology}</div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          items={menuItems}
          onClick={(e) => setSelectedMenuKey(e.key)}
          className="project-menu"
        />
      </Sider>
      <Layout>
        <Content className="project-content">
          {isSummaryView ? (
            <ProjectSummary
              project={project}
              selectedObjects={selectedObjects}
              setSelectedObjects={setSelectedObjects}
              conversionOptions={conversionOptions}
              setConversionOptions={setConversionOptions}
              targetTechnology={targetTechnology}
              setTargetTechnology={setTargetTechnology}
              onGenerate={handleGenerate}
              onProjectUpdate={(updatedProject) => {
                setProject(updatedProject);
                // Update menu items when objects change
                setSelectedMenuKey('summary');
              }}
            />
          ) : currentObject ? (
            <div className="object-detail-view">
              <div className="object-header">
                <h2>{currentObject.name}</h2>
              </div>

              {(currentObject.convertedCode || currentObject.documentation || currentObject.businessRules) ? (
                <SynchronizedCodeView
                  object={currentObject}
                  sourceTechnology={project.sourceTechnology}
                  onSave={(updatedObject) => {
                    const updatedProject = { ...project };
                    const objIndex = updatedProject.objects.findIndex((o) => o.id === currentObject.id);
                    if (objIndex >= 0) {
                      updatedProject.objects[objIndex] = updatedObject;
                      saveProject(updatedProject);
                      setProject(updatedProject);
                    }
                  }}
                />
              ) : (
                <Card>
                  <p>Please generate conversion first from the Project Summary page.</p>
                </Card>
              )}
            </div>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProjectDetailPage;
