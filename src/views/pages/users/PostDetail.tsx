
import React, { useEffect, useMemo, useState } from "react";
import { Typography, Card, Button, Tabs, message, Row, Col, Tag, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail } from "../../../hooks/usePostDetail";

const PostDetail: React.FC = () => {
  const { id: siteId, slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error, fetchDetail, updateDetail, deleteDetail } = usePostDetail(siteId, slug);
  const [content, setContent] = useState("");
  const [tab, setTab] = useState("split");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (post) setContent(post.content || "");
  }, [post]);

  useEffect(() => {
    if (slug) fetchDetail();
    // eslint-disable-next-line
  }, [slug]);

  const stats = useMemo(() => {
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = text ? text.split(" ").length : 0;
    return { chars: content.length, words };
  }, [content]);

  const handleSave = async () => {
    if (!post) return;
    try {
      await updateDetail({ content });
      setDirty(false);
      message.success("Saved");
    } catch {
      message.error("Save failed");
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    if (!window.confirm("Delete this post?")) return;
    try {
      await deleteDetail();
      message.success("Deleted");
      navigate(`/user/workspace/${siteId}`);
    } catch {
      message.error("Delete failed");
    }
  };

  if (!slug) {
    return <Card style={{ maxWidth: 700, margin: "32px auto", padding: 24 }}><Typography.Text type="danger">Missing slug in URL.</Typography.Text></Card>;
  }

  return (
   <>
     <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={3}>
            Post Detail · <span style={{ fontFamily: 'monospace', fontWeight: 400 }}>{slug}</span>
          </Typography.Title>
          <Space>
            {post?.category && <Tag color="blue">{post.category}</Tag>}
            {post?.status && <Tag color="green">{post.status}</Tag>}
            {dirty && <Tag color="orange">Unsaved</Tag>}
          </Space>
        </Col>
        <Col>
          <Space>
            <Button onClick={() => navigate(`/user/workspace/${siteId}`)}>← Back</Button>
            {post && <Button danger onClick={handleDelete}>Delete</Button>}
            {post && <Button type="primary" onClick={handleSave} disabled={!dirty || loading}>{dirty ? "Save" : "Saved"}</Button>}
          </Space>
        </Col>
      </Row>
      <Tabs activeKey={tab} onChange={setTab} items={[
        { key: "edit", label: "Edit", children: (
          <textarea
            value={content}
            onChange={e => { setContent(e.target.value); setDirty(true); }}
            style={{ width: "100%", minHeight: 300, fontFamily: 'monospace', fontSize: 14, padding: 12, borderRadius: 8, border: '1px solid #eee', resize: 'vertical' }}
          />
        ) },
        { key: "preview", label: "Preview", children: (
          <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, minHeight: 300 }}
            dangerouslySetInnerHTML={{ __html: content || "<p>(empty)</p>" }}
          />
        ) },
        { key: "split", label: "Split", children: (
          <Row gutter={24}>
            <Col span={12}>
              <textarea
                value={content}
                onChange={e => { setContent(e.target.value); setDirty(true); }}
                style={{ width: "100%",height: "100%", minHeight: 300, fontFamily: 'monospace', fontSize: 14, padding: 12, borderRadius: 8, border: '1px solid #eee', resize: 'vertical' }}
              />
            </Col>
            <Col span={12}>
              <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, minHeight: 300, overflow: 'auto' }}
                dangerouslySetInnerHTML={{ __html: content || "<p>(empty)</p>" }}
              />
            </Col>
          </Row>
        ) },
      ]} />
      <div style={{ marginTop: 16, textAlign: 'right', color: '#888' }}>
        {stats.words} words · {stats.chars} chars
      </div>
   </>
  );
};

export default PostDetail;
