import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Card,
  Button,
  Tabs,
  message,
  Row,
  Col,
  Tag,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail } from "../../../hooks/usePostDetail";

const PostDetail: React.FC = () => {
  const { id: siteId, slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error, updateDetail, createDetail, deleteDetail, refetchDetail } =
    usePostDetail(siteId, slug);
  const [content, setContent] = useState("");
  const [tab, setTab] = useState("split");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (post) {
      setContent((post as any).content || "");
      setDirty(false);
    }
  }, [post]);

  const stats = useMemo(() => {
    const text = content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = text ? text.split(" ").length : 0;
    return { chars: content.length, words };
  }, [content]);

  const handleSave = async () => {
    if (!slug) return;
    try {
      if (post) {
        await updateDetail({ content });
        await refetchDetail();
        setDirty(false);
        message.success("Saved");
      } else {
        const now = new Date().toISOString();
        await createDetail({
          id: slug,
          slug,
          content,
          updatedAt: now,
        });
        await refetchDetail();
        setDirty(false);
        message.success("Created");
      }
    } catch {
      message.error(post ? "Save failed" : "Create failed");
    }
  };

  const handleDelete = async () => {
    if (!post || !slug) return;
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
    return (
      <Card style={{ maxWidth: 700, margin: "32px auto", padding: 24 }}>
        <Typography.Text type="danger">Missing slug in URL.</Typography.Text>
      </Card>
    );
  }
  if (loading) {
    return (
      <Card style={{ maxWidth: 700, margin: "32px auto", padding: 24 }}>
        <Typography.Text>Loading…</Typography.Text>
      </Card>
    );
  }
  if (error) {
    return (
      <Card style={{ maxWidth: 700, margin: "32px auto", padding: 24 }}>
        <Typography.Text type="danger">{String(error)}</Typography.Text>
      </Card>
    );
  }

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={3}>
            Post Detail ·{" "}
            <span style={{ fontFamily: "monospace", fontWeight: 400 }}>
              {slug}
            </span>
          </Typography.Title>
          <Space>
            {(post as any)?.category && (
              <Tag color="blue">{(post as any).category}</Tag>
            )}
            {(post as any)?.status && (
              <Tag color="green">{(post as any).status}</Tag>
            )}
            {dirty && <Tag color="orange">Unsaved</Tag>}
          </Space>
          {siteId && slug && (
            <div style={{ marginTop: 8 }}>
              <Typography.Text copyable>
                {`https://${siteId}/news/${slug}`}
              </Typography.Text>
            </div>
          )}
        </Col>
        <Col>
          <Space>
            <Button onClick={() => navigate(`/user/workspace/${siteId}`)}>
              ← Back
            </Button>
            {post && (
              <Button danger onClick={handleDelete} disabled={loading}>
                Delete
              </Button>
            )}
            <Button
              type="primary"
              onClick={handleSave}
              disabled={!dirty || loading}
            >
              {dirty ? (post ? "Save" : "Create") : "Saved"}
            </Button>
          </Space>
        </Col>
      </Row>

      <Tabs
        activeKey={tab}
        onChange={setTab}
        items={[
          {
            key: "edit",
            label: "Edit",
            children: (
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setDirty(true);
                }}
                style={{
                  width: "100%",
                  minHeight: 300,
                  fontFamily: "monospace",
                  fontSize: 14,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #eee",
                  resize: "vertical",
                }}
              />
            ),
          },
          {
            key: "preview",
            label: "Preview",
            children: (
              <div
                style={{
                  background: "#fafafa",
                  padding: 16,
                  borderRadius: 8,
                  minHeight: 300,
                }}
                dangerouslySetInnerHTML={{
                  __html: content || "<p>(empty)</p>",
                }}
              />
            ),
          },
          {
            key: "split",
            label: "Split",
            children: (
              <Row gutter={24}>
                <Col span={12}>
                  <textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      setDirty(true);
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: 300,
                      fontFamily: "monospace",
                      fontSize: 14,
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid #eee",
                      resize: "vertical",
                    }}
                  />
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      background: "#fafafa",
                      padding: 16,
                      borderRadius: 8,
                      minHeight: 300,
                      overflow: "auto",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: content || "<p>(empty)</p>",
                    }}
                  />
                </Col>
              </Row>
            ),
          },
        ]}
      />

      <div style={{ marginTop: 16, textAlign: "right", color: "#888" }}>
        {stats.words} words · {stats.chars} chars
      </div>
    </>
  );
};

export default PostDetail;
