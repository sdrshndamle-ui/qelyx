import { useState } from 'react';
import { Card, Input, Button, Tag, Space, Typography } from 'antd';
import { SaveOutlined, DownloadOutlined } from '@ant-design/icons';
import './DocumentationView.css';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface DocumentationViewProps {
  documentation: string;
  confidenceScore: number;
  onSave: (doc: string) => void;
}

const DocumentationView = ({ documentation, confidenceScore, onSave }: DocumentationViewProps) => {
  const [editedDoc, setEditedDoc] = useState(documentation);
  const [isEditing, setIsEditing] = useState(false);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return '#52c41a';
    if (score >= 75) return '#faad14';
    return '#f5222d';
  };

  const handleDownload = () => {
    const blob = new Blob([editedDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentation.md';
    a.click();
  };

  return (
    <div className="documentation-view">
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0, color: '#ffffff' }}>
              Documentation
            </Title>
            <Tag color={getConfidenceColor(confidenceScore)} style={{ fontSize: 14, padding: '4px 12px' }}>
              Confidence: {confidenceScore}%
            </Tag>
          </Space>
        }
        extra={
          <Space>
            {!isEditing ? (
              <>
                <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                  Download
                </Button>
                <Button type="primary" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => {
                  setIsEditing(false);
                  setEditedDoc(documentation);
                }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => {
                    onSave(editedDoc);
                    setIsEditing(false);
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </Space>
        }
        className="documentation-card"
      >
        {isEditing ? (
          <TextArea
            value={editedDoc}
            onChange={(e) => setEditedDoc(e.target.value)}
            rows={25}
            style={{
              fontFamily: 'monospace',
              background: '#1e1e1e',
              color: '#d4d4d4',
              border: '1px solid rgba(148, 163, 184, 0.3)',
            }}
          />
        ) : (
          <div
            className="documentation-content"
            dangerouslySetInnerHTML={{
              __html: editedDoc
                .split('\n')
                .map((line) => {
                  if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
                  if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
                  if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
                  if (line.startsWith('- ') || line.match(/^\d+\./)) return `<li>${line.substring(2)}</li>`;
                  return `<p>${line || '<br>'}</p>`;
                })
                .join(''),
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default DocumentationView;
